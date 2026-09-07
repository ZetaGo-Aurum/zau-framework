import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  Position
} from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { parseZauSFC } from '../parser/sfcParser';

export function getCompletions(document: TextDocument, position: Position): CompletionItem[] {
  const text = document.getText();
  const offset = document.offsetAt(position);
  const line = position.line;
  const lineText = document.getText({
    start: { line, character: 0 },
    end: { line, character: position.character }
  });

  const parsed = parseZauSFC(text);
  const items: CompletionItem[] = [];

  // 1. If typing a tag '<zau-'
  if (lineText.trim().endsWith('<') || lineText.trim().endsWith('<z') || lineText.trim().endsWith('<zau-')) {
    items.push(
      {
        label: 'zau-canvas',
        kind: CompletionItemKind.Class,
        detail: 'ZAU 3D Spatial Canvas Root',
        documentation: {
          kind: 'markdown',
          value: 'WebGL 3D canvas viewport container with automatic responsive resizing, camera mounting, and Three.js scene orchestration.'
        },
        insertText: 'zau-canvas id="${1:main-canvas}" class="${2:w-full h-96}">\n\t$0\n</zau-canvas>',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'zau-model',
        kind: CompletionItemKind.Class,
        detail: 'ZAU 3D Asset with Progressive LOD',
        documentation: {
          kind: 'markdown',
          value: 'Photogrammetry / PBR model renderer supporting Dual-Tier Progressive LOD (Instant Frame 0 low-poly paint, background 8K streaming, and Android GPU memory safety).'
        },
        insertText: 'zau-model src="${1:/model/3d/asset.glb}" progressiveLOD="true" tier="${2:auto}" />',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'zau-camera',
        kind: CompletionItemKind.Class,
        detail: 'ZAU 3D Camera Viewpoint',
        documentation: {
          kind: 'markdown',
          value: 'Configures perspective / orthographic camera position, FOV, and lookAt target.'
        },
        insertText: 'zau-camera :position="${1:[-1.2, 1.2, 2.5]}" :fov="${2:70}" />',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'zau-light',
        kind: CompletionItemKind.Class,
        detail: 'ZAU 3D Scene Illumination',
        documentation: {
          kind: 'markdown',
          value: 'Defines ambient, directional, spot, or hemisphere lights with shadows.'
        },
        insertText: 'zau-light type="${1|ambient,directional,spot,hemisphere|}" :intensity="${2:1.2}" />',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'zau-orbit-controls',
        kind: CompletionItemKind.Class,
        detail: 'ZAU 3D Interactive Controls',
        documentation: {
          kind: 'markdown',
          value: 'Enables 360-degree orbit, pan, and zoom touch/mouse navigation.'
        },
        insertText: 'zau-orbit-controls enableDamping="true" :dampingFactor="0.05" />',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'zau-scene',
        kind: CompletionItemKind.Class,
        detail: 'ZAU Spatial Scene Group',
        insertText: 'zau-scene>\n\t$0\n</zau-scene>',
        insertTextFormat: InsertTextFormat.Snippet
      }
    );
    return items;
  }

  // 2. If typing inside a zau-model tag (attributes)
  if (lineText.includes('<zau-model') || lineText.includes('<zau-camera') || lineText.includes('<zau-canvas')) {
    items.push(
      {
        label: 'src',
        kind: CompletionItemKind.Property,
        detail: 'Path to 3D GLTF/GLB asset',
        insertText: 'src="${1:/model/3d/scene.glb}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'progressiveLOD',
        kind: CompletionItemKind.Property,
        detail: 'Dual-tier progressive LOD boolean',
        documentation: 'Eliminates blackscreens by mounting instant lowpoly model on Frame 0 and swapping to highpoly upon download.',
        insertText: 'progressiveLOD="${1|true,false|}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'tier',
        kind: CompletionItemKind.Property,
        detail: 'GPU texture allocation tier',
        documentation: "'auto' (detects mobile vs desktop) | 'mobile' (4096 texture limit, saves VRAM) | 'desktop' (8K full texture)",
        insertText: 'tier="${1|auto,mobile,desktop|}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: ':position',
        kind: CompletionItemKind.Property,
        detail: 'Reactive 3D Vector3 position [x, y, z]',
        insertText: ':position="[${1:0}, ${2:0}, ${3:0}]"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: ':rotation',
        kind: CompletionItemKind.Property,
        detail: 'Euler rotation in radians [rx, ry, rz]',
        insertText: ':rotation="[${1:0}, ${2:0}, ${3:0}]"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: ':fov',
        kind: CompletionItemKind.Property,
        detail: 'Field of view in degrees',
        insertText: ':fov="${1:70}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: ':intensity',
        kind: CompletionItemKind.Property,
        detail: 'Light intensity float',
        insertText: ':intensity="${1:1.0}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'castShadow',
        kind: CompletionItemKind.Property,
        detail: 'Enable shadow casting',
        insertText: 'castShadow',
        insertTextFormat: InsertTextFormat.PlainText
      }
    );
  }

  // 3. Directives auto-completion (@ and :)
  if (lineText.endsWith('@') || lineText.endsWith(':') || lineText.endsWith('z-')) {
    items.push(
      {
        label: '@click',
        kind: CompletionItemKind.Event,
        detail: 'Click event handler',
        insertText: '@click="${1:handleClick}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: '@load',
        kind: CompletionItemKind.Event,
        detail: 'Model / asset load complete event',
        insertText: '@load="${1:onLoaded}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: '@orbit',
        kind: CompletionItemKind.Event,
        detail: 'Camera orbit change event',
        insertText: '@orbit="${1:onOrbitChange}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: ':bind',
        kind: CompletionItemKind.Keyword,
        detail: 'Reactive signal binding',
        insertText: ':bind="${1:signalValue}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'z-for',
        kind: CompletionItemKind.Keyword,
        detail: 'List rendering directive',
        insertText: 'z-for="${1:item} in ${2:items}" :key="${3:item.id}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'z-if',
        kind: CompletionItemKind.Keyword,
        detail: 'Conditional rendering directive',
        insertText: 'z-if="${1:condition}"',
        insertTextFormat: InsertTextFormat.Snippet
      },
      {
        label: 'z-model',
        kind: CompletionItemKind.Keyword,
        detail: 'Two-way signal binding',
        insertText: 'z-model="${1:state}"',
        insertTextFormat: InsertTextFormat.Snippet
      }
    );
  }

  return items;
}
