import React, { FC } from 'react'
import styles from './result-panel.module.scss'

type Props = {
  result: string
}

const ResultPanel: FC<Props> = ({ result }) => (
  <div className={styles.ResultPanel}>
    Результат
    <div>{result}</div>
  </div>
)

export default ResultPanel
