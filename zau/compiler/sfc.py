# zau/compiler/sfc.py
"""
ZAU Single File Component (SFC) Compiler
Parses .zau components and compiles them into client HTML, JS signals, and styles.
"""

import re
from typing import Dict, Any, Optional

class ZAUComponent:
    def __init__(self, template: str = "", script: str = "", style: str = "", script_lang: str = "ts"):
        self.template = template.strip()
        self.script = script.strip()
        self.style = style.strip()
        self.script_lang = script_lang

    def to_html(self, page_title: str = "ZAU Application") -> str:
        """Transpile component to an interactive HTML page with ZAU client runtime."""
        # Process template directives: @click="method" -> onclick="window.__zau_dispatch('method', event)"
        processed_tpl = self.template
        # Convert @event="handler" to data-zau-event
        processed_tpl = re.sub(
            r'@([a-zA-Z0-9_-]+)="([^"]+)"',
            r'data-zau-on-\1="\2"',
            processed_tpl
        )
        
        # Convert <ZAU.ModelViewer ...> to Google open-source model-viewer element
        processed_tpl = re.sub(
            r'<ZAU\.ModelViewer([^>]*)>',
            r'<model-viewer camera-controls auto-rotate shadow-intensity="1" exposure="1.2" touch-action="pan-y" style="width:100%; height:100%;"\1></model-viewer>',
            processed_tpl
        )
        processed_tpl = re.sub(r'</ZAU\.ModelViewer>', r'</model-viewer>', processed_tpl)

        # Convert <ZAU.Canvas3D ...> to <div data-zau-canvas3d ...>
        processed_tpl = re.sub(
            r'<ZAU\.Canvas3D([^>]*)>',
            r'<div data-zau-canvas3d="true"\1><canvas class="w-full h-full"></canvas>',
            processed_tpl
        )
        processed_tpl = re.sub(r'</ZAU\.Canvas3D>', r'</div>', processed_tpl)

        # Detect spatial components like <ZAU.Model src="..." />
        processed_tpl = re.sub(
            r'<ZAU\.Model([^>]*)/?>',
            r'<model-viewer camera-controls auto-rotate shadow-intensity="1" exposure="1.2" touch-action="pan-y" style="width:100%; height:100%;"\1></model-viewer>',
            processed_tpl
        )

        return processed_tpl

class SFCParser:
    """Extracts template, script, and style from .zau source."""
    
    TEMPLATE_RE = re.compile(r'<template>(.*?)</template>', re.DOTALL | re.IGNORECASE)
    SCRIPT_RE = re.compile(r'<script(?:\s+lang=["\'](.*?)["\'])?>(.*?)</script>', re.DOTALL | re.IGNORECASE)
    STYLE_RE = re.compile(r'<style(?:\s+scoped)?>(.*?)</style>', re.DOTALL | re.IGNORECASE)

    @classmethod
    def parse(cls, source: str) -> ZAUComponent:
        template_match = cls.TEMPLATE_RE.search(source)
        script_match = cls.SCRIPT_RE.search(source)
        style_match = cls.STYLE_RE.search(source)

        template = template_match.group(1) if template_match else ""
        script_lang = "ts"
        script = ""
        if script_match:
            script_lang = script_match.group(1) or "ts"
            script = script_match.group(2)
        style = style_match.group(1) if style_match else ""

        return ZAUComponent(
            template=template,
            script=script,
            style=style,
            script_lang=script_lang
        )
