import React, { FC } from 'react'
// import { NavLink } from 'react-router-dom'

import { Breadcrumb, Steps, Row, Col } from 'antd'
import Container from '~client/shared/partials/Container/Container'

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
      <Container>
        <Row>
          <Col>
            <Breadcrumb style={{ margin: '20px 7px', fontSize: '32px' }}>
              <Breadcrumb.Item>
                {/*<NavLink to={'/lessons'}>Уроки</NavLink>*/}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {LessonNumber} {LessonName}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col flex="auto">
            <Steps style={{ marginLeft: 7, marginTop: 10, padding: '20px' }} current={1}>
              {StepsData.map(step => (
                <Step {...step} key={step.title} />
              ))}
            </Steps>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LessonCaption
