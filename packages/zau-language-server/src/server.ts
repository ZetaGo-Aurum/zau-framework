import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getCompletions } from './features/completion';
import { validateZauDocument } from './features/diagnostics';
import { formatZauDocument } from './features/formatter';
import { getHoverInfo } from './features/hover';
import { buildSemanticTokens, semanticTokensLegend } from './features/semanticTokens';

// Create connection. Compatible with --stdio, --node-ipc, or socket
const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: ['<', '@', ':', 'z', '"', "'", ' ']
      },
      hoverProvider: true,
      documentFormattingProvider: true,
      semanticTokensProvider: {
        legend: semanticTokensLegend,
        full: true
      }
    }
  };
});

// Diagnostics on change and open
documents.onDidChangeContent(change => {
  const diagnostics = validateZauDocument(change.document);
  connection.sendDiagnostics({ uri: change.document.uri, diagnostics });
});

// IntelliSense Auto-completion
connection.onCompletion((textDocumentPosition) => {
  const doc = documents.get(textDocumentPosition.textDocument.uri);
  if (!doc) return [];
  return getCompletions(doc, textDocumentPosition.position);
});

// Hover info
connection.onHover((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  return getHoverInfo(doc, params.position);
});

// Formatter
connection.onDocumentFormatting((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  return formatZauDocument(doc, params.options);
});

// Semantic Tokens
connection.languages.semanticTokens.on((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return { data: [] };
  return buildSemanticTokens(doc);
});

// Listen on the document manager
documents.listen(connection);
// Listen on the connection
connection.listen();
