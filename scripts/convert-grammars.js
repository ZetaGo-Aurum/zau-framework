const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const tmGrammarPath = path.join(rootDir, 'packages/vscode-zau/syntaxes/zau.tmLanguage.json');
const tmGrammar = JSON.parse(fs.readFileSync(tmGrammarPath, 'utf8'));

console.log('Converting TextMate grammar to multi-editor syntax formats...');

// 1. Sublime Text 3/4 (.sublime-syntax)
const sublimeSyntax = `%YAML 1.2
---
# http://www.sublimetext.com/docs/syntax.html
name: Zau Language
file_extensions:
  - zau
scope: source.zau

contexts:
  main:
    - include: comments
    - include: template_block
    - include: script_block
    - include: style_block
    - include: interpolation
    - include: zau_spatial_tags
    - include: zau_directives

  comments:
    - match: '<!--'
      scope: punctuation.definition.comment.html
      push:
        - meta_scope: comment.block.html
        - match: '-->'
          scope: punctuation.definition.comment.html
          pop: true
    - match: '//.*$'
      scope: comment.line.double-slash.js
    - match: '/\\*'
      scope: punctuation.definition.comment.js
      push:
        - meta_scope: comment.block.js
        - match: '\\*/'
          scope: punctuation.definition.comment.js
          pop: true
    - match: '#.*$'
      scope: comment.line.number-sign.python

  interpolation:
    - match: '\\{\\{'
      scope: punctuation.definition.expression.begin.zau
      push:
        - meta_scope: expression.embedded.zau
        - match: '\\}\\}'
          scope: punctuation.definition.expression.end.zau
          pop: true
        - include: scope:source.ts
        - include: scope:source.js

  template_block:
    - match: '(<)(template)(\\s*[^>]*)?(>)'
      captures:
        1: punctuation.definition.tag.begin.html
        2: entity.name.tag.template.html
        3: entity.other.attribute-name.html
        4: punctuation.definition.tag.end.html
      push:
        - meta_scope: text.html.derivative
        - match: '(</)(template)(>)'
          captures:
            1: punctuation.definition.tag.begin.html
            2: entity.name.tag.template.html
            3: punctuation.definition.tag.end.html
          pop: true
        - include: comments
        - include: interpolation
        - include: zau_spatial_tags
        - include: zau_directives
        - include: scope:text.html.basic

  script_block:
    - match: '(<)(script)(?:\\s+[^>]*lang=[\x27"](python|py)[\x27"][^>]*)?(>)'
      captures:
        1: punctuation.definition.tag.begin.html
        2: entity.name.tag.script.html
        3: entity.other.attribute-name.html
        4: punctuation.definition.tag.end.html
      push:
        - meta_scope: source.ts
        - match: '(</)(script)(>)'
          captures:
            1: punctuation.definition.tag.begin.html
            2: entity.name.tag.script.html
            3: punctuation.definition.tag.end.html
          pop: true
        - include: scope:source.ts
        - include: scope:source.js
        - include: scope:source.python

  style_block:
    - match: '(<)(style)(?:\\s+[^>]*lang=[\x27"](scss|sass|postcss)[\x27"][^>]*)?(>)'
      captures:
        1: punctuation.definition.tag.begin.html
        2: entity.name.tag.style.html
        3: entity.other.attribute-name.html
        4: punctuation.definition.tag.end.html
      push:
        - meta_scope: source.css
        - match: '(</)(style)(>)'
          captures:
            1: punctuation.definition.tag.begin.html
            2: entity.name.tag.style.html
            3: punctuation.definition.tag.end.html
          pop: true
        - include: scope:source.css
        - include: scope:source.css.scss

  zau_spatial_tags:
    - match: '(</?)(zau-(?:canvas|model|camera|light|scene|spatial|mesh|orbit-controls|shadow|skybox|env|spotlight|ambient|material|geometry)|Viewer3D|SceneControls|ZAU\\.[A-Za-z0-9]+)\\b'
      captures:
        1: punctuation.definition.tag.begin.html
        2: entity.name.tag.zau.spatial

  zau_directives:
    - match: '(@[a-zA-Z0-9_-]+(?:\\.[a-zA-Z0-9_-]+)*)'
      scope: keyword.operator.directive.event.zau
    - match: '(:[a-zA-Z0-9_-]+(?:\\.[a-zA-Z0-9_-]+)*)'
      scope: keyword.operator.directive.binding.zau
    - match: '\\b(z-if|z-else-if|z-else|z-for|z-model|z-show|z-slot|z-bind|z-on)\\b'
      scope: keyword.control.directive.zau
    - match: '\\b(src|progressiveLOD|tier|position|pos|rotation|rot|scale|fov|target|intensity|color|castShadow|receiveShadow|wireframe|pbr|metalness|roughness|maxTextureSize)\\b'
      scope: support.type.property-name.zau.spatial
`;

const sublimePath = path.join(rootDir, 'packages/vscode-zau/syntaxes/zau.sublime-syntax');
fs.writeFileSync(sublimePath, sublimeSyntax, 'utf8');
console.log('✓ Generated Sublime Text syntax:', sublimePath);

// 2. JetBrains / IntelliJ XML Syntax Definition
const intellijXml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- JetBrains / IntelliJ Custom Language Highlighting for ZAU -->
<filetype binary="false" default_extension="zau" description="Zau Single File Component" name="ZAU">
  <highlighting>
    <options>
      <option name="LINE_COMMENT" value="//" />
      <option name="COMMENT_START" value="<!--" />
      <option name="COMMENT_END" value="-->" />
      <option name="HEX_PREFIX" value="0x" />
      <option name="NUM_POSTFIXES" value="" />
      <option name="HAS_BRACKETS" value="true" />
      <option name="HAS_BRACES" value="true" />
      <option name="HAS_PARENS" value="true" />
      <option name="HAS_STRING_ESCAPES" value="true" />
    </options>
    <keywords casesens="true">
      <keyword name="template" />
      <keyword name="script" />
      <keyword name="style" />
      <keyword name="z-if" />
      <keyword name="z-else-if" />
      <keyword name="z-else" />
      <keyword name="z-for" />
      <keyword name="z-model" />
      <keyword name="z-show" />
      <keyword name="z-slot" />
      <keyword name="zau-canvas" />
      <keyword name="zau-model" />
      <keyword name="zau-camera" />
      <keyword name="zau-light" />
      <keyword name="zau-scene" />
      <keyword name="zau-spatial" />
      <keyword name="zau-mesh" />
      <keyword name="zau-orbit-controls" />
      <keyword name="Viewer3D" />
      <keyword name="SceneControls" />
    </keywords>
    <keywords2 casesens="true">
      <keyword name="src" />
      <keyword name="progressiveLOD" />
      <keyword name="tier" />
      <keyword name="position" />
      <keyword name="rotation" />
      <keyword name="scale" />
      <keyword name="fov" />
      <keyword name="target" />
      <keyword name="intensity" />
      <keyword name="color" />
      <keyword name="castShadow" />
      <keyword name="receiveShadow" />
      <keyword name="wireframe" />
      <keyword name="pbr" />
      <keyword name="metalness" />
      <keyword name="roughness" />
    </keywords2>
  </highlighting>
  <extensionMap>
    <mapping ext="zau" />
  </extensionMap>
</filetype>
`;

const intellijPath = path.join(rootDir, 'packages/vscode-zau/syntaxes/intellij/zau.xml');
fs.writeFileSync(intellijPath, intellijXml, 'utf8');
console.log('✓ Generated IntelliJ XML syntax definition:', intellijPath);

// 3. Vim / Neovim Native Syntax
const vimFtdetect = `au BufNewFile,BufRead *.zau setf zau
`;
const vimSyntax = `" Vim syntax file for ZAU Single File Components
if exists("b:current_syntax")
  finish
endif

syn case match

syn keyword zauBlockTag template script style contained
syn match zauSpatialTag /<\\/\\?\\(zau-[a-zA-Z0-9-]*\\|Viewer3D\\|SceneControls\\)/
syn match zauDirective /[@:][a-zA-Z0-9_.-]\\+/
syn keyword zauControl z-if z-else-if z-else z-for z-model z-show z-slot
syn keyword zauProperty src progressiveLOD tier position rotation scale fov target intensity color castShadow receiveShadow wireframe pbr

syn region zauComment start="<!--" end="-->"
syn region zauString start='"' end='"' containedin=ALL
syn region zauString start="'" end="'" containedin=ALL

syn region zauInterpolation start="{{" end="}}" contains=@zauJs

hi def link zauSpatialTag Function
hi def link zauBlockTag Structure
hi def link zauDirective Identifier
hi def link zauControl Statement
hi def link zauProperty Type
hi def link zauComment Comment
hi def link zauString String
hi def link zauInterpolation Special

let b:current_syntax = "zau"
`;

fs.writeFileSync(path.join(rootDir, 'packages/vscode-zau/syntaxes/vim/ftdetect/zau.vim'), vimFtdetect, 'utf8');
fs.writeFileSync(path.join(rootDir, 'packages/vscode-zau/syntaxes/vim/syntax/zau.vim'), vimSyntax, 'utf8');
console.log('✓ Generated Vim / Neovim ftdetect and syntax files.');

// 4. Zed Editor Grammar Config
const zedExtension = `id = "zau"
name = "Zau Language"
version = "1.0.2"
schema_version = 1
authors = ["ZetaGo-Aurum <admin@zetagoaurum.com>"]
description = "Universal language support and spatial 3D tooling for .zau components in Zed"
repository = "https://github.com/ZetaGo-Aurum/zau-framework"
`;

const zedLangConfig = `name = "ZAU"
grammar = "zau"
path_suffixes = ["zau"]
line_comments = ["// "]
block_comment = ["<!--", "-->"]

[brackets]
characters = [
  { start = "{", end = "}", close = true, newline = true },
  { start = "[", end = "]", close = true, newline = true },
  { start = "(", end = ")", close = true, newline = true },
  { start = "<", end = ">", close = true, newline = true },
  { start = "\\"", end = "\\"", close = true, newline = false },
  { start = "'", end = "'", close = true, newline = false }
]

[language_servers]
zau-lsp = {}
`;

fs.writeFileSync(path.join(rootDir, 'packages/vscode-zau/syntaxes/zed/extension.toml'), zedExtension, 'utf8');
fs.writeFileSync(path.join(rootDir, 'packages/vscode-zau/syntaxes/zed/languages/zau/config.toml'), zedLangConfig, 'utf8');
console.log('✓ Generated Zed editor extension configuration.');

console.log('\nAll multi-editor syntax grammars generated successfully!');
