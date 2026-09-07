#!/usr/bin/env bash
set -e

echo "================================================="
echo "   ZAU Language Extension Packaging Pipeline     "
echo "================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXT_DIR="$ROOT_DIR/packages/vscode-zau"
DIST_DIR="$ROOT_DIR/dist/extensions"

mkdir -p "$DIST_DIR"

# Ensure tools are in PATH
export PATH="/home/zetagoaurum/.npm-global/bin:$PATH"

if ! command -v vsce &> /dev/null; then
  echo "Error: vsce CLI not found in PATH."
  exit 1
fi

if ! command -v ovsx &> /dev/null; then
  echo "Error: ovsx CLI not found in PATH."
  exit 1
fi

echo "1. Converting and syncing multi-editor syntax grammars..."
node "$ROOT_DIR/scripts/convert-grammars.js"

echo "2. Compiling Language Server & VS Code Extension..."
(cd "$ROOT_DIR/packages/zau-language-server" && npm run build)
(cd "$EXT_DIR" && npm run build)

VERSION=$(node -p "require('$EXT_DIR/package.json').version")

echo "3. Packaging VS Code & Open-VSX Extension (.vsix) v$VERSION..."
cd "$EXT_DIR"
vsce package --no-dependencies --allow-star-activation --out "$DIST_DIR/zau-$VERSION.vsix"

echo "4. Package Verification:"
ls -lh "$DIST_DIR/zau-$VERSION.vsix"

echo "================================================="
echo "✓ Package successfully generated at:"
echo "  $DIST_DIR/zau-$VERSION.vsix"
echo "  Ready for VS Code Marketplace & Open VSX deploy."
echo "================================================="
