# ZAU Configuration File
config = {
    "app_name": "my-zau-app",
    "version": "1.0.0",
    "server": {
        "host": "0.0.0.0",
        "port": 8000,
        "reload": True
    },
    "database": {
        "default": "sqlite+aiosqlite:///dev.db"
    },
    "spatial": {
        "engine": "webgl",
        "shadows": True,
        "fps_target": 60
    },
    "styling": {
        "tailwind": True,
        "bootstrap": True
    }
}
