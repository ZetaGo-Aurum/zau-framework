# zau-highlighter

Prism.js and Monaco Editor syntax highlighters for **.zau Single File Components (SFC)**.

## Installation

```bash
npm install zau-highlighter
```

## Usage

### Prism.js Integration
```javascript
import Prism from 'prismjs';
import { registerZauPrism } from 'zau-highlighter/prism-zau';

registerZauPrism(Prism);
```

### Monaco Editor Integration
```javascript
import * as monaco from 'monaco-editor';
import { registerZauMonaco } from 'zau-highlighter/monaco-zau';

registerZauMonaco(monaco);
```

## Author & License

- **Architect**: ZetaGo-Aurum (<admin@zetagoaurum.com>)
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **License**: MIT
