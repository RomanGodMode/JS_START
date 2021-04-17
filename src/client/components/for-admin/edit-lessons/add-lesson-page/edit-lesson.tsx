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
import { NormalizedLesson } from '~shared/types/lesson'
import { unnormalizeLesson } from '~shared/mappers/unnormilize-lesson'
import LoadingPage from "~client/components/for-admin/auth/loading-page/loading-page";

type Props = {
  isPatch?: boolean
  oldLesson?: NormalizedLesson
}

const EditLessonPage: FC<Props> = ({ isPatch, oldLesson }) => {
  const { admin, useAutorizePage } = useAdmin()

  const { isLoaded } = useAutorizePage()
  if (!isLoaded) return <LoadingPage />

  const [form] = Form.useForm()

  const [networkError, setNetworkError] = useState('')

  const router = useRouter()

  const createLesson = async data => {
    const lesson = unnormalizeLesson(data)
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

  const updateLesson = async data => {
    const lesson = unnormalizeLesson(data)
    console.log(lesson)
    try {
      await admin.updateLesson(lesson, oldLesson.num)
      await router.push('/cms/edit-lessons')
    } catch (e) {
      console.log(e.response.data)
      setNetworkError(e.response.data.message)
    }
  }

  return (
    <div className="main-content">
      <Header />
      <Container>
        <div className={s.caption}>
          <h1>{isPatch ? 'Изменить' : 'Добавить'} урок</h1>
          <hr />
        </div>

        <Form initialValues={oldLesson} form={form} className={s.mainForm} onFinish={isPatch ? updateLesson : createLesson}>
          <EditLessonHead />
          <AddTheory form={form} hasTheory={isPatch && !!oldLesson.theory} />
          <EditStages form={form} />
          <EditTips />
          <Form.Item className={s.submitModule}>
            <Button className={s.sendLesson} type="primary" htmlType="submit">
              {isPatch ? 'Изменить урок' : 'Создать урок'}
            </Button>
            {isPatch && (
              <Button
                type={'ghost'}
                className={s.deleteButton}
                onClick={async () => {
                  await admin.deleteLesson(oldLesson.num)
                  await router.push('/cms/edit-lessons')
                }}
              >
                Удалить этот урок
              </Button>
            )}
          </Form.Item>
          <div className={s.error}>{networkError}</div>
        </Form>
      </Container>
    </div>
  )
}

export default EditLessonPage
