#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VSIX_PATH="$ROOT_DIR/dist/extensions/zau-1.0.3.vsix"
export PATH="/home/zetagoaurum/.npm-global/bin:$PATH"

if [ ! -f "$VSIX_PATH" ]; then
  echo "VSIX not found. Running packaging script first..."
  "$ROOT_DIR/scripts/package-extension.sh"
fi

echo "Deploying Zau Language Extension to Global Registries..."

# Visual Studio Marketplace deployment
if [ -n "$VSCE_PAT" ]; then
  echo "Publishing to Visual Studio Marketplace..."
  vsce publish -p "$VSCE_PAT" --packagePath "$VSIX_PATH"
  echo "✓ Successfully published to Visual Studio Marketplace!"
else
  echo "[Notice] VSCE_PAT environment variable not set. Skipping Visual Studio Marketplace auto-push."
fi

# Open VSX Registry deployment (for VSCodium, Gitpod, Eclipse Theia)
if [ -n "$OVSX_PAT" ]; then
  echo "Publishing to Open VSX Registry..."
  ovsx publish "$VSIX_PATH" -p "$OVSX_PAT"
  echo "✓ Successfully published to Open VSX Registry!"
else
  echo "[Notice] OVSX_PAT environment variable not set. Skipping Open VSX auto-push."
fi

echo "Extension pipeline execution complete."
