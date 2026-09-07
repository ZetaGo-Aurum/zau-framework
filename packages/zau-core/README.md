# @zau/core

Core client runtime, Signals reactivity, and Native 3D Spatial Canvas for **ZAU Framework**.

## Installation

```bash
npm install @zau/core three
```

## Basic Usage

```typescript
import { ZAU, useState, useFrame, callAction } from '@zau/core';

// Execute Python Backend Server Action
const projects = await callAction('/api/projects/list', { limit: 5 });

// Reactive State
const [count, setCount] = useState(0);

// 60FPS Spatial Render Loop
useFrame((state, delta) => {
  // Update rotation or transforms
});
```

## Author

Architected & Led by **ZetaGo-Aurum** ([zetagoaurum.com](https://zetagoaurum.com)).  
Contact: `admin@zetagoaurum.com`.
