const { parseZau } = require('./dist/index.js');

const sampleZau = `
<template>
  <div class="zau-app">
    <zau-canvas id="main-canvas" shadows>
      <zau-camera :position="[-1.2, 1.2, 2.5]" :fov="70" />
      <zau-light type="ambient" :intensity="1.5" />
      <zau-model src="/model/3d/salt_tower/salt_tower_8k.glb" progressiveLOD="true" tier="auto" />
      <zau-orbit-controls />
    </zau-canvas>
    <h1 @click="toggle">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { signal } from 'zau-framework';
export default {
  setup() {
    const title = signal('ZAU Spatial Engine');
    return { title };
  }
};
</script>

<style scoped>
.zau-app { width: 100vw; height: 100vh; }
</style>
`;

const res = parseZau(sampleZau);
console.log('Template parsed:', !!res.template);
console.log('Script lang:', res.script?.lang);
console.log('Style scoped:', res.style?.scoped);
console.log('Spatial elements count:', res.spatialElements.length);
console.log('Spatial tags:', res.spatialElements.map(e => e.tag));

if (res.spatialElements.length === 5 && res.spatialElements.some(e => e.tag === 'zau-model')) {
  console.log('✓ All tests PASSED!');
} else {
  console.error('✗ Test FAILED');
  process.exit(1);
}
