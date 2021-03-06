import React, { FC, useState } from 'react'
import s from './code-editor.module.scss'
import ResultPanel from '~client/components/for-student/lesson/code-editor/result-panel/result-panel'
import TextEditor from '~client/components/for-student/lesson/code-editor/text-editor/text-editor'
import ToolsPanel from '~client/components/for-student/lesson/code-editor/tools-panel/tools-panel'

type Props = {
  isPreviouslyPassed: boolean
}

const CodeEditor: FC<Props> = ({ isPreviouslyPassed }) => {
  const [js, setJs] = useState(`console.log('Hello world2')`)

  return (
    <div className={s.CodeEditor}>
      <TextEditor value={js} onChange={setJs} />
      <ToolsPanel js={js} isPreviouslyPassed={isPreviouslyPassed} />
      <ResultPanel />
    </div>
  )
}

export default CodeEditor
