# zau/syntax/highlighter.py
"""
ZAU Syntax Interpreter & Code Highlighter
Provides lexing and tokenization for .zau Single File Components (SFC).
Transforms .zau source code into richly styled HTML or terminal ANSI.
"""

import re
import html
from typing import List, Tuple, Dict, Optional

class TokenType:
    KEYWORD = "keyword"
    SPATIAL = "spatial"
    TAG = "tag"
    DIRECTIVE = "directive"
    ATTRIBUTE = "attribute"
    STRING = "string"
    NUMBER = "number"
    COMMENT = "comment"
    FUNCTION = "function"
    OPERATOR = "operator"
    PUNCTUATION = "punctuation"
    TEXT = "text"

# Keywords
SCRIPT_KEYWORDS = {
    "import", "from", "export", "default", "function", "const", "let", "var",
    "return", "async", "await", "if", "else", "for", "while", "class", "new",
    "try", "catch", "finally", "throw", "typeof", "instanceof", "in", "of",
    "def", "elif", "pass", "None", "True", "False", "true", "false", "null", "undefined"
}

ZAU_BUILTINS = {
    "useState", "useFrame", "useEffect", "useSignal", "callAction", "connectSync",
    "ZAU", "Depends", "get_session", "select", "Model", "Field", "Relationship"
}

SPATIAL_TAGS = {
    "ZAU.Canvas3D", "ZAU.Model", "ZAU.AmbientLight", "ZAU.DirectionalLight",
    "ZAU.PointLight", "ZAU.SpotLight", "ZAU.OrbitControls", "ZAU.Spinner3D",
    "ZAU.Skybox", "ZAU.Environment", "ZAU.Mesh", "ZAU.Box", "ZAU.Sphere",
    "Viewer3D", "SceneControls"
}

class ZAUSyntaxHighlighter:
    """
    High-performance tokenizer and highlighter for .zau code.
    """
    def __init__(self):
        pass

    def highlight_ansi(self, code: str) -> str:
        """Render syntax-colored output for terminal."""
        tokens = self.tokenize(code)
        ansi_map = {
            TokenType.KEYWORD: "\033[1;35m",     # Magenta/Purple
            TokenType.SPATIAL: "\033[1;33m",     # Bold Gold/Yellow
            TokenType.TAG: "\033[1;36m",         # Cyan
            TokenType.DIRECTIVE: "\033[1;31m",   # Bright Red/Coral
            TokenType.ATTRIBUTE: "\033[36m",     # Light Cyan
            TokenType.STRING: "\033[32m",        # Green
            TokenType.NUMBER: "\033[33m",        # Yellow
            TokenType.COMMENT: "\033[2;37m",     # Dim White/Gray
            TokenType.FUNCTION: "\033[1;34m",    # Blue
            TokenType.OPERATOR: "\033[37m",      # White
            TokenType.PUNCTUATION: "\033[37m",   # White
            TokenType.TEXT: "\033[0m",           # Reset
        }
        reset = "\033[0m"
        out = []
        for t_type, val in tokens:
            color = ansi_map.get(t_type, reset)
            out.append(f"{color}{val}{reset}")
        return "".join(out)

    def highlight_html(self, code: str, wrap_pre: bool = True) -> str:
        """Render syntax-colored semantic HTML."""
        tokens = self.tokenize(code)
        out = []
        for t_type, val in tokens:
            escaped = html.escape(val)
            if t_type == TokenType.TEXT:
                out.append(escaped)
            else:
                out.append(f'<span class="zau-tok-{t_type}">{escaped}</span>')

        inner = "".join(out)
        if wrap_pre:
            return (
                '<div class="zau-code-block relative font-mono text-xs rounded-xl overflow-hidden border border-neutral-800 bg-[#0c0d10] shadow-2xl">\n'
                '  <div class="flex items-center justify-between px-4 py-2 border-b border-neutral-800/80 bg-[#12141a] text-neutral-400 select-none">\n'
                '    <div class="flex items-center space-x-2">\n'
                '      <span class="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>\n'
                '      <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>\n'
                '      <span class="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>\n'
                '      <span class="ml-2 font-mono text-[11px] text-neutral-400">component.zau</span>\n'
                '    </div>\n'
                '    <span class="text-[10px] uppercase font-bold tracking-widest text-amber-500/80">ZAU SFC</span>\n'
                '  </div>\n'
                f'  <pre class="p-4 overflow-x-auto leading-relaxed"><code>{inner}</code></pre>\n'
                '</div>'
            )
        return inner

    def tokenize(self, code: str) -> List[Tuple[str, str]]:
        """Lexical analysis yielding (TokenType, value) pairs."""
        tokens: List[Tuple[str, str]] = []
        i = 0
        n = len(code)

        while i < n:
            # 1. Comments
            if code[i:i+4] == "<!--":
                end = code.find("-->", i + 4)
                if end == -1: end = n
                else: end += 3
                tokens.append((TokenType.COMMENT, code[i:end]))
                i = end
                continue
            if code[i:i+2] == "//":
                end = code.find("\n", i + 2)
                if end == -1: end = n
                tokens.append((TokenType.COMMENT, code[i:end]))
                i = end
                continue
            if code[i:i+2] == "/*":
                end = code.find("*/", i + 2)
                if end == -1: end = n
                else: end += 2
                tokens.append((TokenType.COMMENT, code[i:end]))
                i = end
                continue
            if code[i] == "#" and (i == 0 or code[i-1] in ("\n", " ")):
                end = code.find("\n", i + 1)
                if end == -1: end = n
                tokens.append((TokenType.COMMENT, code[i:end]))
                i = end
                continue

            # 2. Strings
            if code[i] in ('"', "'", '`'):
                quote = code[i]
                start = i
                i += 1
                while i < n:
                    if code[i] == "\\" and i + 1 < n:
                        i += 2
                        continue
                    if code[i] == quote:
                        i += 1
                        break
                    i += 1
                tokens.append((TokenType.STRING, code[start:i]))
                continue

            # 3. Numbers
            if code[i].isdigit() and (i == 0 or not (code[i-1].isalnum() or code[i-1] in ("_", "$", "@", ":"))):
                start = i
                while i < n and (code[i].isdigit() or code[i] in (".", "x", "f")):
                    i += 1
                tokens.append((TokenType.NUMBER, code[start:i]))
                continue

            # 4. Tags (<tag, </tag, <ZAU.Spatial, etc.)
            if code[i] == "<":
                start = i
                i += 1
                if i < n and code[i] == "/":
                    i += 1
                # Read tag identifier
                tag_start = i
                while i < n and (code[i].isalnum() or code[i] in (".", "-", "_", ":")):
                    i += 1
                tag_name = code[tag_start:i]
                if tag_name:
                    tokens.append((TokenType.PUNCTUATION, code[start:tag_start]))
                    if tag_name in SPATIAL_TAGS or tag_name.startswith("ZAU."):
                        tokens.append((TokenType.SPATIAL, tag_name))
                    elif tag_name[0].isupper():
                        tokens.append((TokenType.SPATIAL, tag_name))
                    else:
                        tokens.append((TokenType.TAG, tag_name))
                    continue
                else:
                    tokens.append((TokenType.PUNCTUATION, "<"))
                    continue

            # 5. Directives (@click, :bind, v-model, etc.)
            if code[i] in ("@", ":"):
                start = i
                i += 1
                while i < n and (code[i].isalnum() or code[i] in ("-", "_", ".")):
                    i += 1
                tokens.append((TokenType.DIRECTIVE, code[start:i]))
                continue

            # 6. Identifiers (Keywords, Functions, Attributes)
            if code[i].isalpha() or code[i] in ("_", "$"):
                start = i
                while i < n and (code[i].isalnum() or code[i] in ("_", "$", "-")):
                    i += 1
                word = code[start:i]

                # Check if followed by '=' (HTML Attribute)
                peek = i
                while peek < n and code[peek].isspace():
                    peek += 1

                if word in SCRIPT_KEYWORDS:
                    tokens.append((TokenType.KEYWORD, word))
                elif word in ZAU_BUILTINS or word in SPATIAL_TAGS:
                    tokens.append((TokenType.SPATIAL, word))
                elif peek < n and code[peek] == "=":
                    tokens.append((TokenType.ATTRIBUTE, word))
                elif peek < n and code[peek] == "(":
                    tokens.append((TokenType.FUNCTION, word))
                else:
                    tokens.append((TokenType.TEXT, word))
                continue

            # 7. Other punctuation / symbols
            tokens.append((TokenType.PUNCTUATION, code[i]))
            i += 1

        return tokens

    @staticmethod
    def get_css() -> str:
        """Return CSS rules for styling .zau tokenized code blocks."""
        return """
/* ZAU Official Syntax Highlighter Stylesheet */
.zau-code-block {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  background-color: #0b0c10;
  color: #e4e4e7;
}
.zau-tok-keyword {
  color: #c084fc; /* Purple/Violet */
  font-weight: 600;
}
.zau-tok-spatial {
  color: #f59e0b; /* Vibrant Gold / Aurum */
  font-weight: 700;
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.25);
}
.zau-tok-tag {
  color: #38bdf8; /* Sky Blue */
  font-weight: 500;
}
.zau-tok-directive {
  color: #fb7185; /* Rose/Coral */
  font-weight: 600;
}
.zau-tok-attribute {
  color: #34d399; /* Emerald/Mint */
}
.zau-tok-string {
  color: #a3e635; /* Lime/Green */
}
.zau-tok-number {
  color: #fb923c; /* Orange */
}
.zau-tok-function {
  color: #60a5fa; /* Blue */
}
.zau-tok-comment {
  color: #71717a; /* Neutral Muted */
  font-style: italic;
}
.zau-tok-punctuation {
  color: #a1a1aa;
}
"""
