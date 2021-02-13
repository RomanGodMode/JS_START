import React, { useState } from 'react'
import styles from './code-editor.module.scss'
import ResultPanel from '~client/components/for-lesson/code-editor/result-panel/result-panel'
import TextEditor from '~client/components/for-lesson/code-editor/text-editor/text-editor'
import { Button } from 'antd'
import { compile } from '~client/components/for-lesson/code-editor/compile'

const CodeEditor = () => {
  const [js, setJs] = useState('let a = 2')
  const [result, setResult] = useState('')

  console.log(js)

  return (
    <div className="CodeEditor">
      Мдааа
      <TextEditor value={js} onChange={setJs} />
      <Button onClick={() => setResult(compile(js))}>Запустить</Button>
      <ResultPanel result={result} />
    </div>
  )
}

export default CodeEditor
