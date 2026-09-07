import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { parseZauSFC } from '../parser/sfcParser';

export function validateZauDocument(document: TextDocument): Diagnostic[] {
  const text = document.getText();
  const diagnostics: Diagnostic[] = [];
  const lines = text.split('\n');

  // Check 1: Must have at least a <template> or <script> block
  const hasTemplate = /<template[\s>]/i.test(text);
  const hasScript = /<script[\s>]/i.test(text);

  if (!hasTemplate && !hasScript && text.trim().length > 0) {
    diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: lines[0]?.length || 0 }
      },
      message: 'A valid ZAU Single File Component should contain a <template> and/or <script> block.',
      source: 'zau-lsp'
    });
  }

  // Check 2: Unclosed block tags
  const blocks = ['template', 'script', 'style'];
  for (const block of blocks) {
    const openMatches = [...text.matchAll(new RegExp(`<${block}[\\s>]`, 'gi'))];
    const closeMatches = [...text.matchAll(new RegExp(`</${block}>`, 'gi'))];
    if (openMatches.length > closeMatches.length) {
      const lastOpen = openMatches[openMatches.length - 1];
      const startPos = document.positionAt(lastOpen.index!);
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        range: {
          start: startPos,
          end: { line: startPos.line, character: startPos.character + block.length + 2 }
        },
        message: `Unclosed <${block}> block. Expected matching </${block}> tag.`,
        source: 'zau-lsp'
      });
    }
  }

  // Check 3: Validate spatial nodes (e.g. <zau-model> requires src)
  const parsed = parseZauSFC(text);
  for (const node of parsed.spatialNodes) {
    if (node.tag === 'zau-model') {
      if (!node.attrs['src'] && !node.attrs[':src']) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: node.line, character: 0 },
            end: { line: node.line, character: lines[node.line]?.length || 10 }
          },
          message: `<zau-model> missing required 'src' or ':src' attribute for 3D asset location.`,
          source: 'zau-lsp'
        });
      }
    }

    // Check tier validity
    if (node.attrs['tier']) {
      const validTiers = ['auto', 'mobile', 'desktop', '8k', '4k'];
      if (!validTiers.includes(node.attrs['tier'].toLowerCase())) {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range: {
            start: { line: node.line, character: 0 },
            end: { line: node.line, character: lines[node.line]?.length || 10 }
          },
          message: `Unknown tier '${node.attrs['tier']}'. Valid options: ${validTiers.join(', ')}.`,
          source: 'zau-lsp'
        });
      }
    }
  }

  return diagnostics;
}
