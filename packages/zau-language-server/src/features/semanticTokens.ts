import {
  SemanticTokens,
  SemanticTokensBuilder,
  SemanticTokensLegend
} from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';

export const tokenTypes = [
  'class',      // 0: zau-canvas, zau-model
  'function',   // 1: @events
  'property',   // 2: :props
  'keyword',    // 3: z-if, z-for
  'variable',   // 4: interpolation
  'string',     // 5: string literals
  'number'      // 6: numbers
];

export const tokenModifiers = [
  'declaration',
  'definition',
  'readonly',
  'static',
  'defaultLibrary'
];

export const semanticTokensLegend: SemanticTokensLegend = {
  tokenTypes,
  tokenModifiers
};

export function buildSemanticTokens(document: TextDocument): SemanticTokens {
  const builder = new SemanticTokensBuilder();
  const text = document.getText();
  const lines = text.split('\n');

  for (let line = 0; line < lines.length; line++) {
    const lineText = lines[line];

    // Highlight custom spatial tags: <zau-*
    const tagRegex = /<(zau-[a-zA-Z0-9-]+|Viewer3D|SceneControls)\b/g;
    let match: RegExpExecArray | null;
    while ((match = tagRegex.exec(lineText)) !== null) {
      const char = match.index + 1;
      const length = match[1].length;
      builder.push(line, char, length, 0, 0); // class
    }

    // Highlight directives: @click, @load
    const eventRegex = /(@[a-zA-Z0-9_-]+)/g;
    while ((match = eventRegex.exec(lineText)) !== null) {
      builder.push(line, match.index, match[1].length, 1, 0); // function
    }

    // Highlight bound props: :src, :position
    const propRegex = /(:[a-zA-Z0-9_-]+)/g;
    while ((match = propRegex.exec(lineText)) !== null) {
      builder.push(line, match.index, match[1].length, 2, 0); // property
    }

    // Highlight control directives: z-if, z-for
    const ctrlRegex = /\b(z-if|z-else-if|z-else|z-for|z-model|z-show)\b/g;
    while ((match = ctrlRegex.exec(lineText)) !== null) {
      builder.push(line, match.index, match[1].length, 3, 0); // keyword
    }
  }

  return builder.build();
}
