import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // Path to server module
  const serverModule = context.asAbsolutePath(
    path.join('node_modules', 'zau-language-server', 'out', 'server.js')
  );

  // Fallback if running from monorepo development
  const monorepoServerModule = path.resolve(__dirname, '../../zau-language-server/out/server.js');
  const finalServerModule = require('fs').existsSync(serverModule) ? serverModule : monorepoServerModule;

  // Server options
  const serverOptions: ServerOptions = {
    run: { module: finalServerModule, transport: TransportKind.ipc },
    debug: {
      module: finalServerModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] }
    }
  };

  // Client options
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'zau' }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/*.zau')
    }
  };

  // Create and start client
  client = new LanguageClient(
    'zauLanguageServer',
    'Zau Language Server',
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
