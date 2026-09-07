# zau/syntax/vscode.py
"""
Generates TextMate grammar and language configuration for .zau files
for use in VS Code, Cursor, and other modern code editors.
"""

import json

TEXTMATE_GRAMMAR = {
    "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    "name": "ZAU",
    "scopeName": "source.zau",
    "fileTypes": ["zau"],
    "patterns": [
        {"include": "#comments"},
        {"include": "#template-block"},
        {"include": "#script-block"},
        {"include": "#style-block"},
        {"include": "#zau-tags"}
    ],
    "repository": {
        "comments": {
            "patterns": [
                {
                    "name": "comment.block.html",
                    "begin": "<!--",
                    "end": "-->"
                },
                {
                    "name": "comment.line.double-slash.js",
                    "match": "//.*$"
                },
                {
                    "name": "comment.block.js",
                    "begin": "/\\*",
                    "end": "\\*/"
                },
                {
                    "name": "comment.line.number-sign.python",
                    "match": "#.*$"
                }
            ]
        },
        "template-block": {
            "begin": "(<)(template)(>)",
            "beginCaptures": {
                "1": {"name": "punctuation.definition.tag.begin.html"},
                "2": {"name": "entity.name.tag.template.html"},
                "3": {"name": "punctuation.definition.tag.end.html"}
            },
            "end": "(</)(template)(>)",
            "endCaptures": {
                "1": {"name": "punctuation.definition.tag.begin.html"},
                "2": {"name": "entity.name.tag.template.html"},
                "3": {"name": "punctuation.definition.tag.end.html"}
            },
            "patterns": [
                {"include": "#comments"},
                {"include": "#zau-spatial-components"},
                {"include": "#zau-directives"},
                {"include": "#html-tags"}
            ]
        },
        "zau-spatial-components": {
            "patterns": [
                {
                    "name": "entity.name.tag.spatial.zau",
                    "match": "(ZAU\\.[A-Za-z0-9]+|Viewer3D|SceneControls)"
                }
            ]
        },
        "zau-directives": {
            "patterns": [
                {
                    "name": "keyword.operator.directive.event.zau",
                    "match": "(@[a-zA-Z0-9_-]+)"
                },
                {
                    "name": "keyword.operator.directive.binding.zau",
                    "match": "(:[a-zA-Z0-9_-]+)"
                }
            ]
        },
        "script-block": {
            "begin": "(<)(script)(.*?)?(>)",
            "beginCaptures": {
                "1": {"name": "punctuation.definition.tag.begin.html"},
                "2": {"name": "entity.name.tag.script.html"},
                "3": {"name": "entity.other.attribute-name.html"},
                "4": {"name": "punctuation.definition.tag.end.html"}
            },
            "end": "(</)(script)(>)",
            "endCaptures": {
                "1": {"name": "punctuation.definition.tag.begin.html"},
                "2": {"name": "entity.name.tag.script.html"},
                "3": {"name": "punctuation.definition.tag.end.html"}
            },
            "patterns": [
                {"include": "#comments"},
                {"include": "source.ts"},
                {"include": "source.js"},
                {"include": "source.python"}
            ]
        },
        "style-block": {
            "begin": "(<)(style)(.*?)?(>)",
            "beginCaptures": {
                "1": {"name": "punctuation.definition.tag.begin.html"},
                "2": {"name": "entity.name.tag.style.html"},
                "3": {"name": "entity.other.attribute-name.html"},
                "4": {"name": "punctuation.definition.tag.end.html"}
            },
            "end": "(</)(style)(>)",
            "endCaptures": {
                "1": {"name": "punctuation.definition.tag.begin.html"},
                "2": {"name": "entity.name.tag.style.html"},
                "3": {"name": "punctuation.definition.tag.end.html"}
            },
            "patterns": [
                {"include": "source.css"},
                {"include": "source.css.scss"}
            ]
        },
        "html-tags": {
            "patterns": [
                {
                    "name": "entity.name.tag.html",
                    "match": "(<\\/?)([a-zA-Z0-9_-]+)"
                },
                {
                    "name": "entity.other.attribute-name.html",
                    "match": "([a-zA-Z0-9_-]+)="
                },
                {
                    "name": "string.quoted.double.html",
                    "begin": "\"",
                    "end": "\""
                },
                {
                    "name": "string.quoted.single.html",
                    "begin": "'",
                    "end": "'"
                }
            ]
        }
    }
}

LANGUAGE_CONFIGURATION = {
    "comments": {
        "lineComment": "//",
        "blockComment": ["<!--", "-->"]
    },
    "brackets": [
        ["<!--", "-->"],
        ["<", ">"],
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ],
    "autoClosingPairs": [
        {"open": "{", "close": "}"},
        {"open": "[", "close": "]"},
        {"open": "(", "close": ")"},
        {"open": "\"", "close": "\""},
        {"open": "'", "close": "'"},
        {"open": "`", "close": "`"},
        {"open": "<!--", "close": "-->", "notIn": ["comment", "string"]},
        {"open": "<", "close": ">"}
    ],
    "surroundingPairs": [
        {"open": "{", "close": "}"},
        {"open": "[", "close": "]"},
        {"open": "(", "close": ")"},
        {"open": "\"", "close": "\""},
        {"open": "'", "close": "'"},
        {"open": "`", "close": "`"},
        {"open": "<", "close": ">"}
    ]
}

def export_grammar_json() -> str:
    return json.dumps(TEXTMATE_GRAMMAR, indent=2)

def export_lang_config_json() -> str:
    return json.dumps(LANGUAGE_CONFIGURATION, indent=2)
