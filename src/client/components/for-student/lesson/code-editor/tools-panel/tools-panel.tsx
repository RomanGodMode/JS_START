import React, { FC } from 'react'
import s from '~client/components/for-student/lesson/code-editor/code-editor.module.scss'
import { useDispatch } from 'react-redux'
import { compileJs, toNextStage } from '~client/redux/lesson-page/lesson-page-slice'
import { useSelector } from '~client/shared/hooks/useAppSelector'
import Link from 'next/link'

type Props = {
  js: string
}

const ToolsPanel: FC<Props> = ({ js }) => {
  const isCurrentStagePassed = useSelector(state => state.lessonPage.progress.isCurrentPassed)
  const isPreviouslyPassed = useSelector(state => state.lessonPage.progress.isPreviouslyPassed)
  const isLast = useSelector(state => state.lessonPage.progress.isLast)

  const dispatch = useDispatch()

  return (
    <div className={s.toolsPanel}>
      <button className={`${s.ezBtn} ${s.runButton}`} onClick={() => dispatch(compileJs(js))}>
        <span>Запустить</span>
      </button>

      {isPreviouslyPassed ? (
        <Link href={'/lessons'}>
          <button className={`${s.ezBtn} ${s.toNextButton}`}>
            <span>К урокам</span>
          </button>
        </Link>
      ) : (
        isCurrentStagePassed &&
        !isLast && (
          <button className={`${s.ezBtn} ${s.toNextButton}`} onClick={() => dispatch(toNextStage())}>
            <span>К следующему</span>
          </button>
        )
      )}
    </div>
  )
}

export default ToolsPanel
