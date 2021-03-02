import React, { FC } from 'react'
import s from './lesson-caption.module.scss'
import { Breadcrumb, Divider, Steps } from 'antd'
import Link from 'next/link'
import Container from '~client/shared/partials/Container/Container'
import { RootState } from '~client/redux/store'
import { useSelector } from '~client/shared/hooks/useAppSelector'
import { current } from "@reduxjs/toolkit";

const { Step } = Steps

export type StepType = {
  title: string
}

type props = {
  lessonName: string
  lessonNumber: number
  isPreviouslyPassed: boolean
}

const LessonCaption: FC<props> = ({ lessonName, lessonNumber, isPreviouslyPassed}) => {
  const stepsData = useSelector(state => state.lessonPage.steps)

  const currentStage = useSelector(state => state.lessonPage.progress.currentStage)
  const isCurrentPassed = useSelector(state => state.lessonPage.progress.isCurrentPassed)

  const current = (isPreviouslyPassed)? stepsData.length : currentStage + +isCurrentPassed

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
          <Steps className={s.Steps} current={current}>
            {stepsData.map(step => (
              <Step className={s.Step} title={step.title} key={step.title} />
            ))}
          </Steps>
        </div>
      </Container>
      <Divider style={{ borderTop: '1px solid rgb(255,255,255,.7)', marginBottom: 10 }} />
    </>
  )
}

export default LessonCaption
