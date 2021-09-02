import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerTextEditorCommand('case-transform.upper', (textEditor, edit) => {
    textEditor.selections.forEach((item) => {
      console.log(textEditor.document.getText(item))
    })
    vscode.window.showInformationMessage('Hello World from case transform!')
  })

  context.subscriptions.push(disposable)
  context.subscriptions.push(
    vscode.languages.registerSelectionRangeProvider('*', {
      provideSelectionRanges: (document) => {
        console.log(document.getText())
        return []
      },
    }),
  )
}
