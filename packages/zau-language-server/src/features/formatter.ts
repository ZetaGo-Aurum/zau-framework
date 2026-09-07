import { TextEdit, Range, FormattingOptions } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';

export function formatZauDocument(document: TextDocument, options: FormattingOptions): TextEdit[] {
  const text = document.getText();
  const lines = text.split('\n');
  const indentSize = options.tabSize || 2;
  const indentChar = options.insertSpaces !== false ? ' '.repeat(indentSize) : '\t';

  let currentIndent = 0;
  const formattedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      formattedLines.push('');
      continue;
    }

    // Check if line closes a block or tag
    const isClosing = /^<\/(template|script|style|[a-zA-Z0-9_-]+)>|^[}\])]/.test(trimmed);
    if (isClosing && currentIndent > 0) {
      currentIndent--;
    }

    // Indent current line
    formattedLines.push(indentChar.repeat(currentIndent) + trimmed);

    // Check if line opens a block or tag without self-closing
    const isSelfClosing = /\/>$/.test(trimmed);
    const isOpeningTag = /^<([a-zA-Z0-9_-]+)(\s+[^>]*)?>$/.test(trimmed) && !isSelfClosing;
    const isOpeningBrace = /[{[(]$/.test(trimmed);

    if ((isOpeningTag || isOpeningBrace) && !isClosing) {
      currentIndent++;
    }
  }

  const fullRange: Range = {
    start: { line: 0, character: 0 },
    end: { line: lines.length, character: 0 }
  };

  return [
    TextEdit.replace(fullRange, formattedLines.join('\n') + '\n')
  ];
}
