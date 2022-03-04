import * as vscode from 'vscode'

const camelizeRE = /[_-\s]+(\w)/g
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

const underlineRE = /\B([A-Z])/g
export const underline = (str: string): string => {
  // 先统一转成驼峰之后统一处理
  let camelize = str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
  return camelize.replace(underlineRE, '_$1').toLowerCase().replace('/s/g', '_')
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('case-transform.upper', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, textEditor.document.getText(item).toUpperCase())
      })
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('case-transform.lower', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, textEditor.document.getText(item).toLowerCase())
      })
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('case-transform.camel', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, camelize(textEditor.document.getText(item)))
      })
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('case-transform.underline', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, underline(textEditor.document.getText(item)))
      })
    }),
  )
}
