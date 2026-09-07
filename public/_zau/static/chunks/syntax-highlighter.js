/**
 * ZAU Syntax Highlighting Interpreter Chunk [syntax-highlighter.js]
 * (c) 2026 ZetaGo-Aurum | zetagoaurum.com
 */
(function(global) {
  'use strict';

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlightZAUCode(code) {
    let out = '';
    const lines = code.split('\n');
    for (let line of lines) {
      let l = escapeHtml(line);
      if (l.trim().startsWith('//') || l.trim().startsWith('#') || l.trim().startsWith('&lt;!--')) {
        out += '<span class="zau-tok-comment">' + l + '</span>\n';
        continue;
      }
      l = l.replace(/(@[a-zA-Z0-9_-]+)/g, '<span class="zau-tok-directive">$1</span>');
      l = l.replace(/(&lt;\/?)(ZAU\.[a-zA-Z0-9]+|Viewer3D|SceneControls)/g, '$1<span class="zau-tok-spatial">$2</span>');
      l = l.replace(/(&lt;\/?)([a-zA-Z0-9_-]+)/g, '$1<span class="zau-tok-tag">$2</span>');
      l = l.replace(/(&quot;.*?&quot;|'.*?')/g, '<span class="zau-tok-string">$1</span>');
      l = l.replace(/\b(import|from|export|default|function|const|let|var|return|async|await|def|class|True|False|None)\b/g, '<span class="zau-tok-keyword">$1</span>');
      l = l.replace(/\b(useState|useFrame|useEffect|ZAUApp|Depends|get_session|select|Model|Field|Relationship)\b/g, '<span class="zau-tok-function">$1</span>');
      out += l + '\n';
    }
    return '<pre class="p-5 font-mono text-xs leading-relaxed overflow-x-auto"><code>' + out + '</code></pre>';
  }

  global.__ZAU_HIGHLIGHTER__ = { highlight: highlightZAUCode };
})(typeof window !== 'undefined' ? window : globalThis);
