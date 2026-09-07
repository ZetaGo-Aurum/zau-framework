'use client';

import React, { useState } from 'react';

const CODE_EXAMPLES = {
  sfc: {
    filename: 'RoomViewer.zau',
    lang: 'ZAU SFC',
    description: 'Single-File Component fusing TypeScript, 3D Canvas, and Reactive Signals',
    code: `<template>
  <div class="relative w-full h-[650px] rounded-3xl overflow-hidden glass-panel border border-amber-500/20">
    <!-- Native 3D Spatial Canvas with Hallwyl Museum 360 Room -->
    <ZAU.Canvas3D 
      src="/model/3d/the_great_drawing_room/scene_web.gltf"
      exposure={1.3}
      toneMapping="ACESFilmic"
      autoRotate={isRotating}
      fov={55}
    >
      <ZAU.PointLight position={[0, 3.5, 0]} color="#ffb74d" intensity={3.2} />
      <ZAU.DirectionalLight position={[8, 6, 4]} color="#fff9e6" intensity={2.0} />
      <ZAU.Hotspot id="piano" position={[-1.8, -0.6, -2.2]} label="Bechstein Grand" @select="inspectPiano" />
    </ZAU.Canvas3D>

    <!-- Glassmorphic UI HUD Overlaid Directly on 3D Stream -->
    <div class="absolute top-6 left-6 p-4 rounded-2xl glass-panel-glow max-w-sm">
      <div class="flex items-center space-x-2 text-xs font-mono text-amber-400">
        <i class="bi bi-compass-fill"></i>
        <span>360° SPATIAL HUD</span>
      </div>
      <h3 class="text-base font-bold text-white mt-1">{{ roomTitle }}</h3>
      <button @click="toggleRotation" class="mt-3 px-4 py-1.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs">
        <i class="bi bi-arrow-repeat mr-1"></i> Toggle Spin
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'zau-framework';

export default defineComponent({
  setup() {
    const isRotating = ref(true);
    const roomTitle = ref("The Great Drawing Room");

    const toggleRotation = () => {
      isRotating.value = !isRotating.value;
    };

    const inspectPiano = async (node: any) => {
      console.log("Inspecting 3D Audio Node:", node);
    };

    return { isRotating, roomTitle, toggleRotation, inspectPiano };
  }
});
</script>

<style scoped>
.glass-panel-glow {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(245, 158, 11, 0.3);
}
</style>`,
  },
  action: {
    filename: 'backend/actions.py',
    lang: 'Python ASGI',
    description: 'Type-Safe Server Action RPC with Dependency Injection & Async Execution',
    code: `from zau import ZAUApp, Depends
from zau.db import get_async_session, AsyncSession
from models import SpatialAnchor, TelemetryEvent
from typing import Dict, Any

app = ZAUApp(title="ZAU Atelier App", version="1.0.2")

@app.action("/api/spatial/anchor/create")
async def create_spatial_anchor(
    title: str,
    position: list[float],
    category: str = "spatial-hotspot",
    session: AsyncSession = Depends(get_async_session)
) -> Dict[str, Any]:
    """
    Registers a 3D coordinate marker in the database with instant broadcast
    across all active WebSocket client viewports.
    """
    anchor = SpatialAnchor(
        title=title,
        pos_x=position[0],
        pos_y=position[1],
        pos_z=position[2],
        category=category
    )
    session.add(anchor)
    await session.commit()
    await session.refresh(anchor)

    # Realtime synchronization to Three.js viewports
    await app.broadcast_json({
        "type": "SPATIAL_ANCHOR_ADDED",
        "payload": anchor.to_dict()
    })

    return {"status": "success", "id": anchor.id, "position": position}`,
  },
  orm: {
    filename: 'backend/models.py',
    lang: 'Native ORM',
    description: 'Declarative Asynchronous ORM with Automated Schema Migrations',
    code: `from zau.db import Model, Field, Relationship
from datetime import datetime
from typing import Optional, List

class SpatialAnchor(Model):
    __tablename__ = "spatial_anchors"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True, max_length=128)
    category: str = Field(default="hotspot", max_length=64)
    pos_x: float = Field(default=0.0)
    pos_y: float = Field(default=0.0)
    pos_z: float = Field(default=0.0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to visitor interactions
    interactions: List["TelemetryEvent"] = Relationship(back_populates="anchor")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "position": [self.pos_x, self.pos_y, self.pos_z],
            "created_at": self.created_at.isoformat()
        }

class TelemetryEvent(Model):
    __tablename__ = "telemetry_events"

    id: Optional[int] = Field(default=None, primary_key=True)
    anchor_id: int = Field(foreign_key="spatial_anchors.id")
    event_type: str = Field(max_length=32)
    timestamp: datetime = Field(default_factory=datetime.utcnow)`,
  },
  config: {
    filename: 'zau.config.py',
    lang: 'Config Engine',
    description: 'Framework Configuration for 3D Asset Pipeline & Dual Styling',
    code: `import os

config = {
    "app": {
        "title": "The Great Drawing Room Experience",
        "version": "1.0.2",
        "author": "ZetaGo-Aurum",
        "contact": "admin@zetagoaurum.com"
    },
    "spatial": {
        "model_dir": "model/3d/",
        "supported_formats": [".gltf", ".glb", ".obj", ".bin"],
        "default_scene": "the_great_drawing_room/scene_web.gltf",
        "renderer": {
            "antialias": True,
            "tone_mapping": "ACESFilmic",
            "exposure": 1.3,
            "shadows": True
        }
    },
    "styling": {
        "tailwind": {"enabled": True, "jit": True},
        "bootstrap": {"icons": True, "grid": True}
    },
    "bundler": {
        "chunks": ["runtime", "spatial-engine", "syntax-highlighter", "main-app"],
        "minify": True,
        "source_map": False
    }
}`,
  },
};

type TabKey = keyof typeof CODE_EXAMPLES;

export default function CodeViewer() {
  const [activeTab, setActiveTab] = useState<TabKey>('sfc');
  const [copied, setCopied] = useState(false);

  const current = CODE_EXAMPLES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl glass-panel-glow border border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Code Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800/80 px-4 py-3 bg-zinc-950/70 backdrop-blur-md gap-3">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono font-bold text-zinc-300 ml-2 truncate">
              {current.filename}
            </span>
          </div>

          {/* Copy Button (Mobile Only) */}
          <button
            onClick={handleCopy}
            className="sm:hidden flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800/80 border border-zinc-700 transition"
          >
            <i className={`bi ${copied ? 'bi-check2 text-emerald-400' : 'bi-clipboard text-amber-400'}`} />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Tab Buttons (Horizontally scrollable on mobile) */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 overflow-x-auto w-full sm:w-auto">
          {(Object.keys(CODE_EXAMPLES) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition ${
                activeTab === key
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {CODE_EXAMPLES[key].lang}
            </button>
          ))}
        </div>

        {/* Copy Button (Desktop Only) */}
        <button
          onClick={handleCopy}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 transition"
        >
          <i className={`bi ${copied ? 'bi-check2 text-emerald-400' : 'bi-clipboard text-amber-400'}`} />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Description Strip */}
      <div className="px-4 sm:px-6 py-2 bg-amber-500/5 border-b border-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-mono text-zinc-400">
        <span className="truncate max-w-full">{current.description}</span>
        <span className="text-amber-400/90 font-semibold whitespace-nowrap hidden sm:inline">Real-Time Syntax Coloring</span>
      </div>

      {/* Code Content */}
      <pre className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-zinc-200 bg-zinc-950/80 max-h-[480px]">
        <code>{current.code}</code>
      </pre>
    </div>
  );
}
