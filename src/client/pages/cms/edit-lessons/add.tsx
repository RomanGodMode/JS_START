import { Button, Form } from 'antd'
import React from 'react'
import Header from '~client/components/for-admin/header/header'
import s from '../../../static/styles/pages-styles/cms/add-lesson.module.scss'
import EditTips from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-tips/edit-tips'
import Container from '~client/shared/partials/Container/Container'
import EditStages from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-stages/edit-stages'
import EditLessonHead from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-lesson-head/edit-lesson-head'
import AddTheory from '~client/components/for-admin/edit-lessons/add-lesson-page/add-theory/add-theory'
import { useAdmin } from "~client/shared/hooks/useAdmin";

const AddLessonPage = () => {
  const { useAutorizePage } = useAdmin()
  useAutorizePage()

  const [form] = Form.useForm()

  const addLesson = data => {
    debugger
    console.log(data)
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

export default AddLessonPage
