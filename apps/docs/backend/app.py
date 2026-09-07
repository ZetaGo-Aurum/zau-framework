# apps/docs/backend/app.py
"""
ZAU Framework Official Documentation & Showcase Platform
Powered natively by ZAU Framework (Python ASGI Core + 3D Spatial Canvas)
Architect: ZetaGo-Aurum <admin@zetagoaurum.com> | https://zetagoaurum.com
"""

import os
from typing import List, Dict, Any, Optional
from zau import ZAUApp, Depends
from zau.syntax.highlighter import ZAUSyntaxHighlighter
from zau.db import Model, Field, init_db, get_session, AsyncSession, select

# Locate frontend directory
DOCS_FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend"))

app = ZAUApp(
    title="ZAU Framework Official Documentation",
    version="1.0.0",
    client_dir=DOCS_FRONTEND_DIR
)

highlighter = ZAUSyntaxHighlighter()

# Demo Database Models
class DocArticle(Model, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(index=True, unique=True, max_length=100)
    title: str = Field(max_length=200)
    category: str = Field(index=True, max_length=50)
    content: str = Field()

@app.action("/api/docs/sections")
async def get_sections() -> List[Dict[str, Any]]:
    return [
        {
            "id": "intro",
            "title": "Introduction to ZAU",
            "category": "Getting Started",
            "summary": "Dual-Tier Unified Architecture, Python core, and the elimination of toolchain bloat."
        },
        {
            "id": "quickstart",
            "title": "Quick Start & CLI",
            "category": "Getting Started",
            "summary": "Install, scaffold with create-zau, run development server with live reload."
        },
        {
            "id": "syntax",
            "title": ".zau Single File Components",
            "category": "Core Concepts",
            "summary": "Template, script, style, and spatial canvas tags with full syntax interpreter."
        },
        {
            "id": "spatial-3d",
            "title": "Native 3D Spatial Canvas",
            "category": "Spatial Computing",
            "summary": "First-class <ZAU.Canvas3D>, lights, OrbitControls, and GLTF/GLB models."
        },
        {
            "id": "orm",
            "title": "Native Asynchronous ORM",
            "category": "Backend & Database",
            "summary": "Zero-config SQLite, PostgreSQL connection pooling, auto-migrations, and DB Studio."
        },
        {
            "id": "dual-styling",
            "title": "Tailwind & Bootstrap Dual Engine",
            "category": "Styling",
            "summary": "Atomic utility classes combined seamlessly with Bootstrap component tokens."
        },
        {
            "id": "deployment",
            "title": "Deployment Guide",
            "category": "DevOps",
            "summary": "Deploy to Vercel, Render, Replit, and multi-stage Docker containers."
        }
    ]

@app.action("/api/highlight")
async def highlight_code(code: str, mode: str = "html") -> Dict[str, str]:
    if mode == "ansi":
        rendered = highlighter.highlight_ansi(code)
    else:
        rendered = highlighter.highlight_html(code, wrap_pre=True)
    return {"highlighted": rendered}

@app.action("/api/stats")
async def framework_stats() -> Dict[str, Any]:
    return {
        "version": "1.0.0",
        "backend_latency": "3.8ms",
        "engine": "Python ASGI Core (Starlette/uvloop)",
        "spatial_runtime": "Three.js r160+ / WebGL & WebGPU",
        "db_engine": "SQLModel / SQLAlchemy 2.0 Async",
        "styling_adapters": ["Tailwind CSS v3", "Bootstrap 5.3"],
        "license": "MIT",
        "architect": "ZetaGo-Aurum",
        "website": "https://zetagoaurum.com"
    }

@app.websocket("/ws/spatial-sync")
async def docs_spatial_sync(ws):
    await ws.accept()
    while True:
        data = await ws.receive_json()
        await app.broadcast_json({
            "user": data.get("user", "visitor"),
            "transform": data.get("transform", {})
        })
