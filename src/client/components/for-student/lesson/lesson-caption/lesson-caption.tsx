import React, { FC } from 'react'
// import { NavLink } from 'react-router-dom'

import { Breadcrumb, Steps, Row, Col } from 'antd'
import Container from '~client/shared/partials/Container/Container'
import Link from 'next/link'

const { Step } = Steps

export type StepType = {
  title: string
  description: string | null
}

type props = {
  LessonName: string
  LessonNumber: number
  StepsData: StepType[]
}

const LessonCaption: FC<props> = ({ LessonName, LessonNumber, StepsData }) => {
  return (
    <>
        <Breadcrumb style={{ margin: '20px 7px', fontSize: '32px' }}>
          <Breadcrumb.Item>
            <Link href={'/lessons'}>Уроки</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {LessonNumber}. {LessonName}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Steps current={1}>
          {StepsData.map(step => (
            <Step {...step} key={step.title} />
          ))}
        </Steps>
    </>
  )
}

export default LessonCaption
