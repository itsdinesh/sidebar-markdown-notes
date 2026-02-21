import * as vscode from 'vscode';

class Config {
  private readonly config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration('sidebar-markdown-notes');
  }

  get leftMargin() {
    return !!this.config.get('leftMargin', false);
  }

  get vaultPath(): string {
    return this.config.get('vaultPath', '');
  }
}

export function getConfig() {
  return new Config();
}
