import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './text-editor.module.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/addon/hint/show-hint.css'

import dynamic from 'next/dynamic'
import { IControlledCodeMirror } from 'react-codemirror2'

if (typeof window !== 'undefined') {
  // import('codemirror/addon/hint/anyword-hint')
  import('codemirror/addon/hint/show-hint')
  import('codemirror/mode/javascript/javascript')
  import('codemirror/addon/hint/javascript-hint')
}
const Controlled: React.ComponentType<Readonly<IControlledCodeMirror>> = dynamic(
  () => {
    return import('react-codemirror2').then(mod => mod.Controlled)
  },
  { ssr: false }
)

type Props = {
  onChange: (value: string) => void
  value: string
}

//TODO: Прокидывать через пропсы тему и размер шрифта

const TextEditor: FC<Props> = ({ onChange, value }) => {
  const options = {
    lineWrapping: true,
    lint: true,
    theme: 'material',
    lineNumbers: true,
    mode: 'javascript',
    extraKeys: { 'Shift-Space': 'autocomplete' }
  }

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className="editor-container">
      <Controlled onBeforeChange={handleChange} value={value} className="code-mirror-wrapper" options={options} />
    </div>
  )
}

export default TextEditor
