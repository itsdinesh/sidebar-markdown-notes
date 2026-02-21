// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as os from 'os';
import SidebarMarkdownNotesProvider from './webviewProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
  context.subscriptions.push(statusBar);

  const provider = new SidebarMarkdownNotesProvider(context.extensionUri, statusBar);

  // register some listener that make sure the status bar
  // item always up-to-date
  // context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(provider.updateStatusBar));
  // context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(provider.updateStatusBar));

  context.subscriptions.push(vscode.window.registerWebviewViewProvider(SidebarMarkdownNotesProvider.viewId, provider));

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand('sidebar-markdown-notes.togglePreview', () => {
      // The code you place here will be executed every time your command is executed
      provider.togglePreview();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sidebar-markdown-notes.previousPage', () => {
      provider.previousPage();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sidebar-markdown-notes.nextPage', () => {
      provider.nextPage();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sidebar-markdown-notes.resetData', () => {
      provider.resetData();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sidebar-markdown-notes.exportPage', () => {
      provider.exportPage();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sidebar-markdown-notes.setVaultPath', async () => {
      const uri = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: 'Select Local Vault Directory',
        title: 'Select Local Notes Vault Directory',
        defaultUri: vscode.Uri.file(os.homedir())
      });

      if (uri && uri[0]) {
        await vscode.workspace.getConfiguration('sidebar-markdown-notes').update('vaultPath', uri[0].fsPath, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Notes Vault path updated to: ${uri[0].fsPath}`);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
