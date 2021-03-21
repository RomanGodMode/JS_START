import React from 'react'
import EditLessonPage from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-lesson'
import { lessonAPI } from '~client/dal/lessons.api'
import { GetServerSideProps, NextPage } from 'next'
import { NormalizedLesson } from '~shared/types/lesson'

type Props = {
  lesson: NormalizedLesson
}

const EditLessonPageNext: NextPage<Props> = ({ lesson }) => {
  return <EditLessonPage isPatch oldLesson={lesson} />
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { num } = context.params
  const data = await lessonAPI.getLesson(+num)

  const lesson: NormalizedLesson = {
    ...data,
    tooltips: data.tooltips.map(t => ({ tipText: t })),
    stages: data.stages.map(s => ({ answer: s.answer, task: s.task, title: s.title }))
  }

  return {
    props: {
      lesson
    }
  }
}

export default EditLessonPageNext
