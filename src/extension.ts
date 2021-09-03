import * as vscode from 'vscode'

const camelizeRE = /_(\w)/g
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerTextEditorCommand('case-transform.upper', (textEditor, edit) => {
    textEditor.selections.forEach((item) => {
      edit.replace(item, camelize(textEditor.document.getText(item)))
    })
    vscode.window.showInformationMessage('Hello World from case transform!')
  })

  context.subscriptions.push(disposable)
}
