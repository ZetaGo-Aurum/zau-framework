# zau/db/connection.py
import os
from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker, AsyncEngine
from zau.db.models import Model

_ENGINE: Optional[AsyncEngine] = None
_SESSION_FACTORY: Optional[async_sessionmaker[AsyncSession]] = None

def get_database_url() -> str:
    url = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///dev.db")
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif url.startswith("sqlite:///") and not url.startswith("sqlite+"):
        url = url.replace("sqlite:///", "sqlite+aiosqlite:///", 1)
    return url

def get_engine(uri: Optional[str] = None) -> AsyncEngine:
    global _ENGINE, _SESSION_FACTORY
    target_url = uri or get_database_url()
    if _ENGINE is None:
        kwargs = {"echo": os.getenv("ZAU_DB_ECHO", "false").lower() == "true"}
        if "sqlite" in target_url:
            kwargs["connect_args"] = {"check_same_thread": False}
        _ENGINE = create_async_engine(target_url, **kwargs)
        _SESSION_FACTORY = async_sessionmaker(_ENGINE, expire_on_commit=False, class_=AsyncSession)
    return _ENGINE

def get_session_factory() -> async_sessionmaker[AsyncSession]:
    get_engine()
    assert _SESSION_FACTORY is not None
    return _SESSION_FACTORY

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI / ZAU Dependency that provides an AsyncSession."""
    factory = get_session_factory()
    async with factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise

async def init_db(uri: Optional[str] = None, recreate: bool = False):
    """Initialize database tables automatically based on declared Models."""
    engine = get_engine(uri)
    async with engine.begin() as conn:
        if recreate:
            await conn.run_sync(Model.metadata.drop_all)
        await conn.run_sync(Model.metadata.create_all)
