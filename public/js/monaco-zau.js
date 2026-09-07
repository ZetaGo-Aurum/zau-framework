/**
 * Monaco Editor language configuration and Monarch tokenizer for ZAU (.zau)
 */
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ZauMonaco = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  const languageId = 'zau';

  const configuration = {
    comments: {
      blockComment: ['<!--', '-->'],
      lineComment: '//'
    },
    brackets: [
      ['<!--', '-->'],
      ['<', '>'],
      ['{', '}'],
      ['(', ')'],
      ['[', ']']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '<', close: '>' }
    ]
  };

  const monarchTokens = {
    defaultToken: '',
    tokenPostfix: '.zau',
    keywords: [
      'template', 'script', 'style',
      'z-if', 'z-else-if', 'z-else', 'z-for', 'z-model', 'z-show',
      'src', 'progressiveLOD', 'tier', 'position', 'rotation', 'scale', 'fov'
    ],
    tokenizer: {
      root: [
        [/<!--/, 'comment', '@comment'],
        [/(<\/?)(zau-[a-zA-Z0-9-]+|Viewer3D|SceneControls)/, ['delimiter', 'tag.spatial']],
        [/(<\/?)(\w+)/, ['delimiter', 'tag']],
        [/>/, 'delimiter'],
        [/@[a-zA-Z0-9_.-]+/, 'variable.event'],
        [/:[a-zA-Z0-9_.-]+/, 'variable.binding'],
        [/\b(z-if|z-for|z-model)\b/, 'keyword'],
        [/\{\{/, 'delimiter.bracket', '@interpolation'],
        [/"([^"\\]|\\.)*"/, 'string'],
        [/'([^'\\]|\\.)*'/, 'string'],
        [/\s+/],
        [/[\w-]+/, 'attribute.name']
      ],
      comment: [
        [/-->/, 'comment', '@pop'],
        [/./, 'comment']
      ],
      interpolation: [
        [/\}\}/, 'delimiter.bracket', '@pop'],
        [/./, 'variable']
      ]
    }
  };

  function register(monaco) {
    if (!monaco || !monaco.languages) return;
    monaco.languages.register({ id: languageId, extensions: ['.zau'] });
    monaco.languages.setLanguageConfiguration(languageId, configuration);
    monaco.languages.setMonarchTokensProvider(languageId, monarchTokens);
    console.log('[ZAU Monaco] Language "zau" registered successfully.');
  }

  return {
    languageId,
    configuration,
    monarchTokens,
    register
  };
}));
