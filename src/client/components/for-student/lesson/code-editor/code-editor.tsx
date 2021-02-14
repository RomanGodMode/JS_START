import React, { useState } from 'react'
import s from './code-editor.module.scss'
import ResultPanel from '~client/components/for-student/lesson/code-editor/result-panel/result-panel'
import TextEditor from '~client/components/for-student/lesson/code-editor/text-editor/text-editor'
import { compile } from '~client/components/for-student/lesson/code-editor/compile'

const CodeEditor = () => {
  const [js, setJs] = useState('let a = 2')
  const [result, setResult] = useState('')

  console.log(js)

  return (
    <div className={s.CodeEditor}>
      <TextEditor value={js} onChange={setJs} />
      <div className={s.toolsPanel}>
        <button className={s.runButton} onClick={() => setResult(compile(js))}>
          <span>Запустить</span>
          <i className={`fas fa-arrow-right ${s.arrow}`}/>
        </button>
      </div>
      <ResultPanel result={result} />
    </div>
  )
}

export default CodeEditor
