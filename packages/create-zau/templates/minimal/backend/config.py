import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///dev.db")
ZAU_ENV = os.getenv("ZAU_ENV", "development")
PORT = int(os.getenv("PORT", 8000))
