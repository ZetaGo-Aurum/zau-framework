from zau import ZAUApp, Depends
from zau.db import get_session, AsyncSession, select
from backend.database.models.user import User
from backend.database.models.project import Project
from typing import List

app = ZAUApp(
    title="ZAU Production Suite",
    version="1.0.0",
    client_dir="frontend"
)

@app.action("/api/projects/list")
async def list_projects(
    limit: int = 10,
    session: AsyncSession = Depends(get_session)
) -> List[dict]:
    statement = select(Project).limit(limit)
    result = await session.execute(statement)
    projects = result.scalars().all()
    return [p.to_dict() for p in projects]

@app.action("/api/status")
async def server_status() -> dict:
    return {
        "status": "online",
        "engine": "Python ASGI Core (ZAU)",
        "spatial": "WebGL/WebGPU Ready",
        "latency_ms": 3.8
    }

@app.websocket("/ws/spatial-sync")
async def spatial_sync(ws):
    await ws.accept()
    while True:
        data = await ws.receive_json()
        await app.broadcast_json({"user": data.get("user", "guest"), "transform": data.get("transform", {})})
