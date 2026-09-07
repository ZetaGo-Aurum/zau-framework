/**
 * Prism.js grammar extension for ZAU Language (.zau)
 */
(function (Prism) {
  if (typeof Prism === 'undefined') return;

  Prism.languages.zau = Prism.languages.extend('markup', {
    'comment': [
      /<!--[\s\S]*?-->/,
      /\/\/.*$/,
      /\/\*[\s\S]*?\*\//
    ],
    'interpolation': {
      pattern: /\{\{[\s\S]*?\}\}/,
      inside: {
        'punctuation': /^\{\{|\}\}$/,
        rest: Prism.languages.javascript || Prism.languages.markup
      }
    }
  });

  // Spatial component tags
  Prism.languages.insertBefore('zau', 'tag', {
    'spatial-tag': {
      pattern: /<\/?(zau-[a-zA-Z0-9-]+|Viewer3D|SceneControls)\b[^>]*>/i,
      inside: {
        'tag': {
          pattern: /^<\/?(zau-[a-zA-Z0-9-]+|Viewer3D|SceneControls)/i,
          inside: {
            'punctuation': /^<\/?/,
            'namespace': /^zau-/,
            'class-name': /[\w-]+$/
          }
        },
        'directive-event': {
          pattern: /@[a-zA-Z0-9_.-]+/,
          alias: 'function'
        },
        'directive-bind': {
          pattern: /:[a-zA-Z0-9_.-]+/,
          alias: 'keyword'
        },
        'directive-control': {
          pattern: /\b(z-if|z-else-if|z-else|z-for|z-model|z-show)\b/,
          alias: 'keyword'
        },
        'attr-value': {
          pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/,
          inside: {
            'punctuation': [
              /^=/,
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ]
          }
        },
        'punctuation': /\/?>/,
        'attr-name': /[\w:-]+/
      }
    }
  });
})(typeof Prism !== 'undefined' ? Prism : null);
