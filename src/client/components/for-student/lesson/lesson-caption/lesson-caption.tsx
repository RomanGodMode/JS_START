import React, { FC } from 'react'
import s from './lesson-caption.module.scss'
import { Breadcrumb, Divider, Steps } from 'antd'
import Link from 'next/link'
import Container from '~client/shared/partials/Container/Container'
import { useSelector } from '~client/shared/hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { backtrackStage } from '~client/redux/lesson-page/lesson-page-slice'

const { Step } = Steps

export type StepType = {
  title: string
}

type props = {
  lessonName: string
  lessonNumber: number
  isPreviouslyPassed: boolean
}

const LessonCaption: FC<props> = ({ lessonName, lessonNumber, isPreviouslyPassed }) => {
  const stepsData = useSelector(state => state.lessonPage.steps)

  const passedStagesCount = useSelector(state => state.lessonPage.progress.passedStagesCount)

  const dispatch = useDispatch()

  return (
    <>
      <Container>
        <div className={s.LessonCaption}>
          <Breadcrumb className={s.HlebnieKroshki}>
            <Breadcrumb.Item>
              <Link href={'/lessons'}>Уроки</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {lessonNumber}. {lessonName}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Steps className={s.Steps} current={isPreviouslyPassed ? stepsData.length : passedStagesCount}>
            {stepsData.map((step, i) => (
              <Step
                className={`${s.Step} ${isPreviouslyPassed && s.PassedStep}`}
                onClick={() => dispatch(backtrackStage({ stageNum: i }))}
                title={step.title}
                key={step.title}
              />
            ))}
          </Steps>
        </div>
      </Container>
      <Divider style={{ borderTop: '1px solid rgb(255,255,255,.7)', marginBottom: 10 }} />
    </>
  )
}

export default LessonCaption
