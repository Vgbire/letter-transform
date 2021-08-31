import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('case-transform.helloWorld', (textEditor, edit) => { 
    vscode.window.showInformationMessage('Hello World from case transform!')
  })

  context.subscriptions.push(disposable)
	context.subscriptions.push(vscode.languages.registerSelectionRangeProvider('*', {
		provideSelectionRanges: (document)=>{
			console.log(document.getText())
			return []
		}
	}
}
