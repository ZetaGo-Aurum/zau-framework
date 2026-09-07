(function (root, factory) {
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
  /**
 * ZAU Universal Isomorphic Parser & Runtime
 * Compatible with Node.js, Deno, Bun, and all modern browsers (V8, WebKit, Gecko).
 */

const SPATIAL_TAG_REGEX = /^(zau-(canvas|model|camera|light|scene|spatial|mesh|orbit-controls|shadow|skybox)|Viewer3D|SceneControls)$/i;

function parseZau(source) {
  const descriptor = {
    template: null,
    script: null,
    style: null,
    spatialElements: []
  };

  // 1. Extract SFC blocks
  const templateMatch = source.match(/<template(?:\s+([^>]*))?>([\s\S]*?)<\/template>/i);
  if (templateMatch) {
    const rawContent = templateMatch[2];
    descriptor.template = {
      content: rawContent,
      ast: parseTemplate(rawContent, descriptor.spatialElements)
    };
  }

  const scriptMatch = source.match(/<script(?:\s+([^>]*))?>([\s\S]*?)<\/script>/i);
  if (scriptMatch) {
    const rawAttrs = scriptMatch[1] || '';
    const langMatch = rawAttrs.match(/lang=['"]([^'"]+)['"]/i);
    descriptor.script = {
      content: scriptMatch[2],
      lang: langMatch ? langMatch[1] : 'ts'
    };
  }

  const styleMatch = source.match(/<style(?:\s+([^>]*))?>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    const rawAttrs = styleMatch[1] || '';
    const langMatch = rawAttrs.match(/lang=['"]([^'"]+)['"]/i);
    descriptor.style = {
      content: styleMatch[2],
      scoped: /scoped/i.test(rawAttrs),
      lang: langMatch ? langMatch[1] : 'css'
    };
  }

  return descriptor;
}

function parseTemplate(templateText, spatialList) {
  const root = [];
  const tagRegex = /<([a-zA-Z0-9_-]+)(\s+[^>]*)?\/?>|<\/([a-zA-Z0-9_-]+)>/g;
  let match;

  while ((match = tagRegex.exec(templateText)) !== null) {
    const isClosing = !!match[3];
    if (isClosing) continue;

    const tagName = match[1];
    const rawAttrs = match[2] || '';
    const isSpatial = SPATIAL_TAG_REGEX.test(tagName);

    const attrs = {};
    const directives = {};

    const attrRegex = /([:@a-zA-Z0-9_.-]+)(?:=(['"])(.*?)\2)?/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      const name = attrMatch[1];
      const val = attrMatch[3] !== undefined ? attrMatch[3] : 'true';
      if (name.startsWith('@') || name.startsWith(':') || name.startsWith('z-')) {
        directives[name] = val;
      } else {
        attrs[name] = val;
      }
    }

    const node = {
      type: 'element',
      tag: tagName,
      isSpatial: isSpatial,
      attrs: attrs,
      directives: directives,
      children: []
    };

    if (isSpatial) {
      spatialList.push({
        tag: tagName,
        attrs: Object.assign({}, attrs, directives)
      });
    }

    root.push(node);
  }

  return root;
}




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
    version: '1.0.2'
  };
}));
