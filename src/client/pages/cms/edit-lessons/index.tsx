import React from 'react'
import s from '../../../static/styles/pages-styles/cms/index.module.scss'
import { LessonHead } from '~shared/types/lesson'
import { userAPI } from '~client/dal/lessons.api'
import { NextPage } from 'next'

type Props = {
  lessons: LessonHead[]
}

const Index: NextPage<Props> = ({ lessons }) => {
  return (
    <div>
      Уроки
      {/*TODO: Убрать fontawesome */}
      {/* Потом тупо скопировать lessonList */}
    </div>
  )
}

export default Index

export async function getServerSideProps() {
  let lessons: LessonHead[]
  try {
    lessons = await userAPI.getLessons()
  } catch (e) {
    console.log(e)
  }

  return {
    props: { lessons }
  }
}
