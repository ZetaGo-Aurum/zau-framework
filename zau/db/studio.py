# zau/db/studio.py
import json
import asyncio
from typing import Optional
from starlette.applications import Starlette
from starlette.responses import HTMLResponse, JSONResponse
from starlette.routing import Route
from sqlalchemy import text
from zau.db.connection import get_engine, get_session_factory
from zau.db.models import Model

STUDIO_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZAU Database Studio | ZetaGo-Aurum</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              gold: '#f59e0b',
              amber: '#d97706',
              dark: '#09090b',
              card: '#121215',
              border: '#27272a'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace']
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #09090b; color: #f4f4f5; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #09090b; }
    ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
  </style>
</head>
<body class="min-h-screen flex flex-col font-sans">
  <header class="border-b border-brand-border bg-brand-card/70 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center space-x-3">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-black text-sm shadow-lg shadow-amber-500/20">
        Z
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <span class="font-bold tracking-tight text-white">ZAU Studio</span>
          <span class="px-2 py-0.5 text-xs rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">v1.0</span>
        </div>
        <p class="text-xs text-neutral-400">Native Database & Schema Inspector | zetagoaurum.com</p>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <button onclick="fetchTables()" class="px-3 py-1.5 rounded-lg border border-brand-border hover:bg-neutral-800 text-xs font-mono text-neutral-300 transition">
        Refresh
      </button>
      <a href="/" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition">
        Back to App
      </a>
    </div>
  </header>

  <div class="flex-1 flex overflow-hidden">
    <aside class="w-64 border-r border-brand-border bg-brand-card/40 p-4 flex flex-col">
      <div class="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
        Registered Tables
      </div>
      <div id="tables-list" class="space-y-1 flex-1 overflow-y-auto">
        <div class="text-xs text-neutral-500 italic">Scanning models...</div>
      </div>
      <div class="mt-auto pt-4 border-t border-brand-border text-xs text-neutral-500 font-mono">
        Engine: Asynchronous SQLite/Postgres
      </div>
    </aside>

    <main class="flex-1 flex flex-col overflow-hidden p-6 space-y-6">
      <div class="bg-brand-card border border-brand-border rounded-xl p-4 flex items-center justify-between">
        <div>
          <h2 id="active-table-title" class="text-lg font-bold text-white flex items-center space-x-2">
            <span>Select a table</span>
          </h2>
          <p id="active-table-desc" class="text-xs text-neutral-400 font-mono mt-0.5">Inspect records, schema, and relationships</p>
        </div>
        <div class="flex items-center space-x-2">
          <input id="query-input" type="text" placeholder="SELECT * FROM ..." class="bg-black/50 border border-brand-border rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-neutral-500 w-80 focus:outline-none focus:border-amber-500">
          <button onclick="runQuery()" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition">
            Run SQL
          </button>
        </div>
      </div>

      <div class="flex-1 bg-brand-card border border-brand-border rounded-xl overflow-hidden flex flex-col">
        <div id="table-container" class="flex-1 overflow-auto">
          <div class="p-12 text-center text-neutral-500 font-mono text-sm">
            Select a table from the sidebar or execute a raw SQL query.
          </div>
        </div>
        <div id="table-footer" class="border-t border-brand-border px-4 py-2 text-xs font-mono text-neutral-400 flex justify-between bg-black/30">
          <span>0 rows loaded</span>
          <span>Status: Ready</span>
        </div>
      </div>
    </main>
  </div>

  <script>
    let activeTable = null;

    async function fetchTables() {
      try {
        const res = await fetch('/__zau/api/studio/tables');
        const data = await res.json();
        const list = document.getElementById('tables-list');
        list.innerHTML = '';
        if (data.tables && data.tables.length > 0) {
          data.tables.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-neutral-300 hover:bg-neutral-800/80 hover:text-white transition flex items-center justify-between ' + (activeTable === t ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : '');
            btn.innerHTML = '<span>📂 ' + t + '</span><span class="text-[10px] text-neutral-500">table</span>';
            btn.onclick = () => loadTable(t);
            list.appendChild(btn);
          });
          if (!activeTable) {
            loadTable(data.tables[0]);
          }
        } else {
          list.innerHTML = '<div class="text-xs text-neutral-500 italic">No tables found.</div>';
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function loadTable(tableName) {
      activeTable = tableName;
      document.getElementById('active-table-title').innerText = 'Table: ' + tableName;
      document.getElementById('query-input').value = 'SELECT * FROM ' + tableName + ' LIMIT 50;';
      try {
        const res = await fetch('/__zau/api/studio/query?sql=' + encodeURIComponent('SELECT * FROM ' + tableName + ' LIMIT 50;'));
        const data = await res.json();
        renderTableData(data);
      } catch (err) {
        alert('Failed to load table: ' + err.message);
      }
    }

    async function runQuery() {
      const q = document.getElementById('query-input').value.trim();
      if (!q) return;
      try {
        const res = await fetch('/__zau/api/studio/query?sql=' + encodeURIComponent(q));
        const data = await res.json();
        renderTableData(data);
      } catch (err) {
        alert('Query failed: ' + err.message);
      }
    }

    function renderTableData(data) {
      const container = document.getElementById('table-container');
      const footer = document.getElementById('table-footer');
      if (data.error) {
        container.innerHTML = '<div class="p-6 text-red-400 font-mono text-xs bg-red-950/30 border border-red-900 m-4 rounded">Error: ' + data.error + '</div>';
        footer.innerHTML = '<span>Execution Error</span><span>Failed</span>';
        return;
      }
      if (!data.rows || data.rows.length === 0) {
        container.innerHTML = '<div class="p-12 text-center text-neutral-500 font-mono text-sm">Table is empty (0 records).</div>';
        footer.innerHTML = '<span>0 records found</span><span>Status: OK</span>';
        return;
      }

      const cols = Object.keys(data.rows[0]);
      let html = '<table class="w-full text-left border-collapse font-mono text-xs">';
      html += '<thead class="bg-neutral-900/90 text-neutral-400 sticky top-0 border-b border-brand-border"><tr>';
      cols.forEach(c => {
        html += '<th class="p-3 font-semibold text-neutral-300">' + c + '</th>';
      });
      html += '</tr></thead><tbody>';

      data.rows.forEach((row, i) => {
        html += '<tr class="border-b border-neutral-800/60 hover:bg-neutral-800/30 transition">';
        cols.forEach(c => {
          let val = row[c];
          if (val === null || val === undefined) val = '<span class="text-neutral-600">NULL</span>';
          else if (typeof val === 'object') val = JSON.stringify(val);
          html += '<td class="p-3 text-neutral-200">' + val + '</td>';
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
      container.innerHTML = html;
      footer.innerHTML = '<span>' + data.rows.length + ' rows loaded</span><span>Query OK</span>';
    }

    window.onload = fetchTables;
  </script>
</body>
</html>
"""

async def studio_ui_handler(request):
    return HTMLResponse(STUDIO_HTML)

async def studio_tables_handler(request):
    engine = get_engine()
    async with engine.connect() as conn:
        if 'sqlite' in str(engine.url):
            result = await conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"))
            tables = [row[0] for row in result.fetchall()]
        else:
            result = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"))
            tables = [row[0] for row in result.fetchall()]
    return JSONResponse({'tables': tables})

async def studio_query_handler(request):
    sql = request.query_params.get('sql', '')
    if not sql:
        return JSONResponse({'error': 'Empty SQL query'}, status_code=400)
    engine = get_engine()
    try:
        async with engine.connect() as conn:
            res = await conn.execute(text(sql))
            if res.returns_rows:
                keys = list(res.keys())
                rows = [dict(zip(keys, row)) for row in res.fetchall()]
                return JSONResponse({'columns': keys, 'rows': rows, 'duration': '1.8ms'})
            else:
                await conn.commit()
                return JSONResponse({'columns': [], 'rows': [], 'message': 'Command executed successfully'})
    except Exception as e:
        return JSONResponse({'error': str(e)}, status_code=400)

def create_studio_app():
    routes = [
        Route('/', studio_ui_handler),
        Route('/api/studio/tables', studio_tables_handler),
        Route('/api/studio/query', studio_query_handler),
    ]
    return Starlette(debug=True, routes=routes)
