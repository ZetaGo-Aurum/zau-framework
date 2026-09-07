# zau-parser

Universal lightweight isomorphic parser and browser runtime for **.zau Single File Components (SFC)**.

## Installation

```bash
npm install zau-parser
```

## Usage

### In Node.js / Bundlers

```javascript
import { parseZau } from 'zau-parser';

const sfcSource = `
<template>
  <div class="container">
    <ZAU.Canvas3D>
      <ZAU.Model src="/model/core.glb" />
    </ZAU.Canvas3D>
  </div>
</template>

<script lang="ts">
import { useState } from 'zau-framework';
export default function Viewer() {
  const [active, setActive] = useState(true);
  return { active };
}
</script>

<style scoped>
.container { width: 100%; height: 100%; }
</style>
`;

const ast = parseZau(sfcSource);
console.log(ast.template);
console.log(ast.script);
console.log(ast.style);
console.log(ast.spatialElements);
```

### In the Browser (UMD / CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/zau-parser/dist/zau-browser.js"></script>
<script>
  const result = window.ZauParser.parseZau('<template>...</template>');
</script>
```

## Author & License

- **Architect**: ZetaGo-Aurum (<admin@zetagoaurum.com>)
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **License**: MIT
