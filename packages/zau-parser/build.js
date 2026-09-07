const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'src/index.js'), 'utf8');

// 1. CommonJS
fs.writeFileSync(path.join(__dirname, 'dist/index.js'), src, 'utf8');

// 2. ESM
const esm = src.replace('module.exports = { parseZau };', 'export { parseZau };\nexport default parseZau;');
fs.writeFileSync(path.join(__dirname, 'dist/index.mjs'), esm, 'utf8');

// 3. Browser Standalone UMD
const browserScript = `(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    var zau = factory();
    root.ZauParser = zau;
    root.ZauRuntime = zau;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  ${src.replace('module.exports = { parseZau };', '')}

  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
      var zauScripts = document.querySelectorAll('script[type="text/zau"]');
      zauScripts.forEach(function(script, index) {
        var source = script.textContent || '';
        if (!source.trim()) return;
        var descriptor = parseZau(source);
        console.log('[ZAU Browser Runtime] Mounted .zau component #' + index, descriptor);
        var event = new CustomEvent('zau:mounted', { detail: { descriptor: descriptor, script: script } });
        window.dispatchEvent(event);
      });
    });
  }

  return {
    parseZau: parseZau,
    version: '1.0.5'
  };
}));
`;
fs.writeFileSync(path.join(__dirname, 'dist/zau-browser.js'), browserScript, 'utf8');

console.log('✓ Successfully built zau-parser');
