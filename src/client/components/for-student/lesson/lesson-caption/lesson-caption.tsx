import React, { FC } from 'react'
import s from './lesson-caption.module.scss'
import { Breadcrumb, Divider, Steps } from 'antd'
import Link from 'next/link'
import Container from '~client/shared/partials/Container/Container'

const { Step } = Steps

export type StepType = {
  title: string
}

type props = {
  lessonName: string
  lessonNumber: number
  stepsData: StepType[]
  current: number
}

const LessonCaption: FC<props> = ({ lessonName, lessonNumber, stepsData, current }) => {
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
