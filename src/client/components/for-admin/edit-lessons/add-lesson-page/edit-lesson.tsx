import { Button, Form } from 'antd'
import React, { FC, useState } from 'react'
import Header from '~client/components/for-admin/header/header'
import s from '../../../../static/styles/pages-styles/cms/add-lesson.module.scss'
import EditTips from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-tips/edit-tips'
import Container from '~client/shared/partials/Container/Container'
import EditStages from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-stages/edit-stages'
import EditLessonHead from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-lesson-head/edit-lesson-head'
import AddTheory from '~client/components/for-admin/edit-lessons/add-lesson-page/add-theory/add-theory'
import { useAdmin } from '~client/shared/hooks/useAdmin'
import { useRouter } from 'next/router'

type Props = {
  isPatch?: boolean
}

const EditLessonPage: FC<Props> = ({ isPatch }) => {
  const { admin, useAutorizePage } = useAdmin()
  useAutorizePage()

  const [form] = Form.useForm()

  const [networkError, setNetworkError] = useState('')

  const router = useRouter()

  const addLesson = async data => {
    const lesson = {
      ...data,
      stages: data.stages.map((s, i) => ({ ...s, num: i + 1 })),
      tooltips: data.tooltips.map(t => t.tipText),
      theory: data.theory || ''
    }

    try {
      await admin.createLesson(lesson)
      await router.push('/cms/edit-lessons')
    } catch (e) {
      if (e.response.data.statusCode === 400) {
        const notUniqueNum = e.response.data.message.includes('lessons num must be unique')
        const notUniqueTheme = e.response.data.message.includes('lesson theme must be unique')

        if (notUniqueNum && notUniqueTheme) {
          setNetworkError('Тема урока и номер должны быть уникальны')
        } else {
          if (notUniqueTheme) setNetworkError('Тема урока должна быть уникальна')
          else setNetworkError('Номер урока должен быть уникальным')
        }
      } else setNetworkError('Возможно сервер умер страшной смертью')
    }
  }

  return (
    <div className="main-content">
      <Header />
      <Container>
        <div className={s.caption}>
          <h1>Добавить урок</h1>
          <hr />
        </div>

        <Form form={form} className={s.mainForm} onFinish={addLesson}>
          <EditLessonHead />
          <AddTheory />
          <EditStages form={form} />
          <EditTips />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Кинуть урок на сервер
            </Button>
          </Form.Item>
          <div className={s.error}>{networkError}</div>
        </Form>
      </Container>
    </div>
  )
}

export default EditLessonPage
