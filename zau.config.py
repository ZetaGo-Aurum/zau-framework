"""
ZAU Framework Configuration File (zau.config.py)
Project-Level Spatial 3D Shading, Dynamic Shadows, and Asset Pipeline Configuration
(c) 2026 ZetaGo-Aurum <admin@zetagoaurum.com> | zetagoaurum.com
"""

config = {
    "app": {
        "title": "ZAU 3D Spatial Experience",
        "version": "1.0.2",
        "author": "ZetaGo-Aurum",
        "contact": "admin@zetagoaurum.com"
    },
    "spatial": {
        "model_dir": "model/3d/",
        "supported_formats": [".glb", ".gltf", ".obj", ".bin"],
        "default_scene": "porsche_992_gt3_r/porsche_992_gt3_r.glb",
        "shading": {
            "shadows": {
                "enabled": True,
                "type": "PCFSoft",          # 'basic' | 'pcf' | 'PCFSoft' | 'vsm'
                "resolution": 2048,          # 1024 | 2048 | 4096
                "bias": -0.0001,
                "ground_contact": True,
                "ground_opacity": 0.45
            },
            "lighting": {
                "ambient": {
                    "color": "#ffffff",
                    "intensity": 0.85
                },
                "key_light": {
                    "color": "#fffaed",
                    "intensity": 2.2,
                    "position": [5.0, 8.0, 5.0],
                    "cast_shadow": True
                },
                "fill_light": {
                    "color": "#90cdf4",
                    "intensity": 1.1,
                    "position": [-5.0, 4.0, -3.0]
                },
                "rim_light": {
                    "color": "#fbbf24",
                    "intensity": 1.5,
                    "position": [0.0, 5.0, -6.0]
                },
                "ground_bounce": {
                    "color": "#38bdf8",
                    "intensity": 0.4,
                    "position": [0.0, -2.0, 0.0]
                }
            },
            "environment": {
                "tone_mapping": "ACESFilmic",
                "exposure": 1.15,
                "background": "#090a0f"
            },
            "materials": {
                "anisotropy": 16,            # 16x anisotropic filtering for razor-sharp textures
                "double_sided": False,
                "preserve_materials": True
            }
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
}
