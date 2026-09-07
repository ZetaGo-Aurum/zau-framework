import { Hover, MarkupKind, Position } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';

const HOVER_DOCS: Record<string, string> = {
  'zau-canvas': `### \`<zau-canvas>\`
Universal WebGL 3D Spatial Canvas viewport. Automatically mounts Three.js renderer, manages camera perspective, lighting, and handles resize observers.

**Props:**
- \`id\` (string): Unique canvas element ID.
- \`class\` / \`className\` (string): CSS classes for styling.
- \`shadows\` (boolean): Enable real-time shadow map rendering.`,

  'zau-model': `### \`<zau-model>\`
High-fidelity 3D Asset Loader with Dual-Tier Progressive LOD.

**Features:**
- **Instant Frame 0 Render:** Mounts ultra low-poly preview (< 20ms) to eliminate blackscreens.
- **Background Stream:** Seamlessly swaps to refined 8K/4K mesh and textures upon completion.
- **Android Memory Guard:** Automatically prevents unified memory VRAM crashes on mobile GPUs.

**Props:**
- \`src\` (string, required): URI to 3D asset (\`.glb\`, \`.gltf\`).
- \`progressiveLOD\` (boolean): Enables instant low-poly to high-poly streaming. Default \`true\`.
- \`tier\` (\`"auto" | "mobile" | "desktop"\`): GPU memory allocation strategy.
- \`:position\` (\`[x, y, z]\`): Spatial position coordinates.
- \`:rotation\` (\`[rx, ry, rz]\`): Spatial rotation in radians.
- \`:scale\` (\`number | [x, y, z]\`): Scaling factor.`,

  'zau-camera': `### \`<zau-camera>\`
Perspective / Orthographic 3D camera controller.

**Props:**
- \`:position\` (\`[x, y, z]\`): Eye position coordinates.
- \`:target\` (\`[x, y, z]\`): LookAt target point.
- \`:fov\` (number): Field of view in degrees (default: 65).`,

  'zau-light': `### \`<zau-light>\`
Photometric and PBR scene lighting component.

**Props:**
- \`type\` (\`"ambient" | "directional" | "spot" | "hemisphere"\`): Light archetype.
- \`:intensity\` (number): Brightness intensity multiplier.
- \`:color\` (string): Hex color code (\`"#ffffff"\`).
- \`castShadow\` (boolean): Cast shadow map onto receiving surfaces.`,

  'zau-orbit-controls': `### \`<zau-orbit-controls>\`
Universal orbit, pan, and zoom camera controller with touch gesture and inertia damping.`,

  '@click': `### \`@click\`
Event binding directive for click and touch interactions on 2D DOM and 3D raycast surfaces.`,

  ':bind': `### \`:bind\` / \`:prop\`
One-way reactive signal binding from JavaScript/TypeScript state to component properties.`,

  'z-for': `### \`z-for\`
High-performance declarative list renderer with keyed DOM diffing.
\`\`\`html
<div z-for="item in items" :key="item.id">{{ item.name }}</div>
\`\`\``,

  'z-if': `### \`z-if\`
Conditional rendering directive that mounts or unmounts elements based on boolean reactivity.`
};

export function getHoverInfo(document: TextDocument, position: Position): Hover | null {
  const line = position.line;
  const lineText = document.getText({
    start: { line, character: 0 },
    end: { line, character: 200 }
  });

  for (const [key, doc] of Object.entries(HOVER_DOCS)) {
    if (lineText.includes(key)) {
      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: doc
        }
      };
    }
  }

  return null;
}
