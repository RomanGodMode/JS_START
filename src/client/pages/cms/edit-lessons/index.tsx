import React from 'react'
import s from '../../../static/styles/pages-styles/cms/index.module.scss'
import { LessonHead } from '~shared/types/lesson'
import { userAPI } from '~client/dal/lessons.api'
import { NextPage } from 'next'
import { LessonCard } from '~client/components/for-admin/edit-lessons/lesson-card/lesson-card'
import Header from '~client/components/for-admin/header/header'
import { AddLessonCard } from '~client/components/for-admin/edit-lessons/add-lesson-card/add-lesson-card'

type Props = {
  lessons: LessonHead[]
}

const Index: NextPage<Props> = ({ lessons }) => {
  return (
    <div className={`${s.lessonsPage} main-content`}>
      <Header />
      <div className={s.list}>
        {lessons.map(l => (
          <LessonCard key={l.theme + l.num} lesson={l} />
        ))}
        <AddLessonCard />
      </div>
    </div>
  )
}

export default Index

export async function getServerSideProps() {
  let lessons: LessonHead[]
  try {
    lessons = await userAPI.getLessons()
  } catch (e) {}

  return {
    props: { lessons }
  }
}
