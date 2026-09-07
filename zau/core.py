# zau/core.py
"""
ZAU Core Application Kernel
FastAPI-grade ASGI application with Starlette core, Server Action RPC,
Spatial WebSocket synchronization, and automatic client asset mounting.
"""

import os
import json
import inspect
import asyncio
from contextlib import asynccontextmanager
from typing import Callable, Any, Dict, List, Optional, Set
from starlette.applications import Starlette
from starlette.routing import Route, WebSocketRoute, Mount
from starlette.requests import Request
from starlette.responses import JSONResponse, Response, HTMLResponse, FileResponse
from starlette.websockets import WebSocket, WebSocketDisconnect
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from zau.db.studio import create_studio_app
from zau.compiler.bridge import generate_typescript_definitions
from zau.compiler.sfc import SFCParser
from zau.syntax.highlighter import ZAUSyntaxHighlighter

class Depends:
    """Dependency injection marker for server action parameters."""
    def __init__(self, dependency: Callable):
        self.dependency = dependency

class ZAUApp:
    def __init__(
        self,
        title: str = "ZAU Application",
        version: str = "1.0.0",
        client_dir: Optional[str] = None,
        cors_origins: Optional[List[str]] = None,
        debug: bool = True
    ):
        self.title = title
        self.version = version
        self.client_dir = client_dir
        self.debug = debug

        self._server_actions: Dict[str, Callable] = {}
        self._action_dependencies: Dict[str, Dict[str, Callable]] = {}
        self._active_websockets: Set[WebSocket] = set()
        self._custom_routes: List[Route] = []
        self._custom_ws_routes: List[WebSocketRoute] = []

        self._highlighter = ZAUSyntaxHighlighter()
        self._starlette_app: Optional[Starlette] = None

    def action(self, path: str, methods: Optional[List[str]] = None):
        """Decorator to register a Server Action RPC endpoint."""
        methods = methods or ["GET", "POST"]

        def decorator(func: Callable):
            self._server_actions[path] = func
            sig = inspect.signature(func)
            deps = {}
            for name, param in sig.parameters.items():
                if isinstance(param.default, Depends):
                    deps[name] = param.default.dependency
            self._action_dependencies[path] = deps
            return func
        return decorator

    def websocket(self, path: str):
        """Decorator to register a WebSocket endpoint."""
        def decorator(func: Callable):
            async def ws_handler(websocket: WebSocket):
                self._active_websockets.add(websocket)
                try:
                    await func(websocket)
                except WebSocketDisconnect:
                    pass
                finally:
                    self._active_websockets.discard(websocket)
            self._custom_ws_routes.append(WebSocketRoute(path, ws_handler))
            return func
        return decorator

    async def broadcast_json(self, data: Any):
        """Broadcast a JSON message to all currently connected WebSockets."""
        dead = []
        for ws in list(self._active_websockets):
            try:
                await ws.send_json(data)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self._active_websockets.discard(ws)

    def route(self, path: str, methods: Optional[List[str]] = None):
        """Standard HTTP route decorator."""
        methods = methods or ["GET"]
        def decorator(func: Callable):
            self._custom_routes.append(Route(path, func, methods=methods))
            return func
        return decorator

    def get_asgi_app(self) -> Starlette:
        """Construct the compiled Starlette ASGI app."""
        if self._starlette_app is not None:
            return self._starlette_app

        routes = []

        # 1. Mount custom routes
        routes.extend(self._custom_routes)

        # 2. Mount Server Action RPC endpoints
        for path, func in self._server_actions.items():
            routes.append(Route(path, self._create_action_handler(path, func), methods=["GET", "POST", "OPTIONS"]))

        # 3. Mount WebSockets
        routes.extend(self._custom_ws_routes)

        # 4. Internal framework routes: Studio, Type Bridge, Syntax Highlight API
        routes.append(Route("/__zau/types.d.ts", self._types_handler))
        routes.append(Route("/__zau/api/highlight", self._highlight_api_handler, methods=["POST"]))
        routes.append(Mount("/__zau/studio", app=create_studio_app()))

        # 5. Client static and page resolution
        if self.client_dir and os.path.exists(self.client_dir):
            routes.append(Mount("/static", app=StaticFiles(directory=self.client_dir), name="static"))
            routes.append(Route("/", self._client_root_handler))
            routes.append(Route("/{path:path}", self._client_fallback_handler))

        # Middleware
        middleware = [
            Middleware(
                CORSMiddleware,
                allow_origins=["*"],
                allow_methods=["*"],
                allow_headers=["*"],
                allow_credentials=True
            )
        ]

        @asynccontextmanager
        async def app_lifespan(app_instance):
            try:
                from zau.db.connection import get_engine
                get_engine()
            except Exception:
                pass
            yield

        self._starlette_app = Starlette(
            debug=self.debug,
            routes=routes,
            middleware=middleware,
            lifespan=app_lifespan
        )
        return self._starlette_app

    def _create_action_handler(self, path: str, func: Callable):
        deps = self._action_dependencies.get(path, {})
        sig = inspect.signature(func)

        async def handler(request: Request):
            if request.method == "OPTIONS":
                return Response(status_code=200)

            kwargs = {}
            body_json = {}
            if request.method == "POST":
                try:
                    body_json = await request.json()
                except Exception:
                    body_json = {}

            query_params = dict(request.query_params)
            
            exit_stack = []
            try:
                for param_name, dep_fn in deps.items():
                    res = dep_fn()
                    if inspect.isasyncgen(res):
                        val = await anext(res)
                        exit_stack.append(res)
                        kwargs[param_name] = val
                    elif inspect.iscoroutine(res):
                        val = await res
                        kwargs[param_name] = val
                    elif inspect.isgenerator(res):
                        val = next(res)
                        kwargs[param_name] = val
                    else:
                        kwargs[param_name] = res

                for param_name, param in sig.parameters.items():
                    if param_name in kwargs:
                        continue
                    if param_name in body_json:
                        kwargs[param_name] = body_json[param_name]
                    elif param_name in query_params:
                        raw = query_params[param_name]
                        if param.annotation is int:
                            try: raw = int(raw)
                            except: pass
                        elif param.annotation is float:
                            try: raw = float(raw)
                            except: pass
                        elif param.annotation is bool:
                            raw = raw.lower() in ("true", "1", "yes")
                        kwargs[param_name] = raw
                    elif param.default is not inspect.Parameter.empty and not isinstance(param.default, Depends):
                        kwargs[param_name] = param.default

                if inspect.iscoroutinefunction(func):
                    result = await func(**kwargs)
                else:
                    result = func(**kwargs)

                result = self._serialize_result(result)
                return JSONResponse(result)

            except Exception as e:
                if self.debug:
                    import traceback
                    traceback.print_exc()
                return JSONResponse({"error": str(e), "status": "error"}, status_code=500)
            finally:
                for async_gen in exit_stack:
                    try:
                        await async_gen.aclose()
                    except Exception:
                        pass

        return handler

    def _serialize_result(self, val: Any) -> Any:
        if hasattr(val, "to_dict"):
            return val.to_dict()
        if isinstance(val, list):
            return [self._serialize_result(item) for item in val]
        if isinstance(val, dict):
            return {k: self._serialize_result(v) for k, v in val.items()}
        return val

    async def _types_handler(self, request: Request):
        ts_code = generate_typescript_definitions(self)
        return Response(ts_code, media_type="application/typescript")

    async def _highlight_api_handler(self, request: Request):
        data = await request.json()
        code = data.get("code", "")
        mode = data.get("mode", "html")
        if mode == "ansi":
            res = self._highlighter.highlight_ansi(code)
        else:
            res = self._highlighter.highlight_html(code, wrap_pre=data.get("wrap", True))
        return JSONResponse({"highlighted": res})

    async def _client_root_handler(self, request: Request):
        if not self.client_dir:
            return HTMLResponse("<h1>ZAU Application Active</h1><p>Client directory not configured.</p>")
        index_html = os.path.join(self.client_dir, "index.html")
        if os.path.exists(index_html):
            return FileResponse(index_html)
        return HTMLResponse("<h1>ZAU Core Running</h1><p>Visit /__zau/studio for database inspector.</p>")

    async def _client_fallback_handler(self, request: Request):
        rel_path = request.path_params.get("path", "")
        if self.client_dir:
            file_path = os.path.join(self.client_dir, rel_path)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                return FileResponse(file_path)
            index_html = os.path.join(self.client_dir, "index.html")
            if os.path.exists(index_html):
                return FileResponse(index_html)
        return JSONResponse({"detail": "Not Found"}, status_code=404)

    async def __call__(self, scope, receive, send):
        asgi_app = self.get_asgi_app()
        await asgi_app(scope, receive, send)
