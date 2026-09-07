# api/index.py
# Vercel Serverless ASGI Entrypoint for ZAU Framework
import os
import sys

# Ensure root workspace is on path
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from apps.docs.backend.app import app

# Vercel expects `app` to be an ASGI / WSGI application
handler = app
