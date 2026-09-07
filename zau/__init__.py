# zau/__init__.py
"""
ZAU Framework (ZetaGo-Aurum Unified Fullstack Web Framework)
Modern Python-first fullstack web framework with native 3D spatial canvas,
integrated async database ORM, and dual-asset styling engine.
"""

from zau.core import ZAUApp, Depends
from starlette.requests import Request
from starlette.responses import Response, JSONResponse, HTMLResponse
from starlette.websockets import WebSocket
from zau import db
from zau import syntax
from zau import compiler

__version__ = "1.0.2"
__author__ = "ZetaGo-Aurum <admin@zetagoaurum.com>"
__homepage__ = "https://zetagoaurum.com"

__all__ = [
    "ZAUApp",
    "Depends",
    "Request",
    "Response",
    "JSONResponse",
    "HTMLResponse",
    "WebSocket",
    "db",
    "syntax",
    "compiler",
    "__version__"
]
