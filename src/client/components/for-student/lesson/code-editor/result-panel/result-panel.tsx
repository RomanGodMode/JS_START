import React, { FC } from 'react'
import s from './result-panel.module.scss'

type Props = {
  result: string
}

const ResultPanel: FC<Props> = ({ result }) => (
  <div className={s.ResultPanel}>
    {!!result? result : 'Пока ваш код ничего не выводит'}
  </div>
)

export default ResultPanel
