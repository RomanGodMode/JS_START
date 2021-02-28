import React, { FC } from 'react'
import s from './result-panel.module.scss'
import { useSelector } from '~client/shared/hooks/useAppSelector'

type Props = {
}

const ResultPanel: FC<Props> = () => {
  const result = useSelector((state) => state.lessonPage.result)

  return <div className={s.ResultPanel}>{!!result ? result : 'Пока ваш код ничего не выводит'}</div>
}

export default ResultPanel
