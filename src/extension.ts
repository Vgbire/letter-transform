import { ExtensionContext, commands, Position, window } from 'vscode'

const camelizeRE = /[_-\s]+(\w)/g
export const camelize = (str: string): string => {
  let result = str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
  result = result[0].toLowerCase() + result.slice(1)
  return result
}

export const pascal = (str: string): string => {
  let result = str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
  result = result[0].toUpperCase() + result.slice(1)
  return result
}

const underlineRE = /\B([A-Z])/g
export const addSeparator = (str: string, separator: string): string => {
  // 先统一转成驼峰之后统一处理
  return camelize(str)
    .replace(underlineRE, separator + '$1')
    .toLowerCase()
    .replace('/s/g', '_')
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerTextEditorCommand('case-transform.camel', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, camelize(textEditor.document.getText(item)))
      })
    }),
  )

  context.subscriptions.push(
    commands.registerTextEditorCommand('case-transform.underline', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, addSeparator(textEditor.document.getText(item), '_'))
      })
    }),
  )

  context.subscriptions.push(
    commands.registerTextEditorCommand('case-transform.kebab', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, addSeparator(textEditor.document.getText(item), '-'))
      })
    }),
  )

  context.subscriptions.push(
    commands.registerTextEditorCommand('case-transform.upper', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, textEditor.document.getText(item).toUpperCase())
      })
    }),
  )

  context.subscriptions.push(
    commands.registerTextEditorCommand('case-transform.lower', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, textEditor.document.getText(item).toLowerCase())
      })
    }),
  )

  context.subscriptions.push(
    commands.registerTextEditorCommand('case-transform.pascal', (textEditor, edit) => {
      textEditor.selections.forEach((item) => {
        edit.replace(item, pascal(textEditor.document.getText(item)))
      })
    }),
  )

  context.subscriptions.push(
    commands.registerCommand('case-transform.cls', () => {
      const editor: any = window.activeTextEditor
      const document = editor.document
      editor.selections.forEach((item: any) => {
        const lineNumber = item.active.line
        const isMaxLine = lineNumber + 1 >= document.lineCount
        let text = document.getText(item)
        if (item.isEmpty) {
          const lineText = document.lineAt(lineNumber).text
          console.log(lineText)
          const before = lineText.slice(0, item.start.character)
          const after = lineText.slice(item.end.character)

          text = (before.match(/[\w]+$/)?.[0] || '') + (after.match(/^[\w]+/)?.[0] || '')
        }
        editor.edit((editBuilder: any) => {
          editBuilder.insert(
            new Position(isMaxLine ? document.lineCount : lineNumber + 1, 0),
            `${isMaxLine ? '\n' : ''}console.log(${text})\n`,
          )
        })
      })
    }),
  )
}
