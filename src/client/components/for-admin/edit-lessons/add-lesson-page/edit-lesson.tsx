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
    try {
      const body = { ...data }
      body.stages = body.stages.map((s, i) => ({ ...s, num: i + 1 }))
      body.tooltips = body.tooltips.map(t => t.tipText)
      const res = await admin.createLesson(body)
    } catch (e) {
      console.log(e) //TODO: Смотреть на код ошибки
      setNetworkError('')
    }

    // await router.push('/cms/lessons')
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
          {/*  TODO: Ошибка сервера*/}
        </Form>
      </Container>
    </div>
  )
}

export default EditLessonPage
