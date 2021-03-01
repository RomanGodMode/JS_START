import React from 'react'
import { NextPage } from 'next'
import { LessonHead } from '~shared/types/lesson'
import { userAPI } from '~client/dal/lessons.api'
import s from '../../static/styles/pages-styles/lessons/index.module.scss'
import Header from '~client/components/for-student/header/header'
import { useLocalStorage } from '~client/shared/hooks/useLocalStorage'
import dynamic from 'next/dynamic'
import { OptimizedHead } from '~client/components/seo/OptimizedHead'
const LessonCard = dynamic(() => import('../../components/for-student/lesson-card/lesson-card').then(mod => mod.LessonCard), { ssr: false })

type Props = {
  lessons: LessonHead[]
}

const Index: NextPage<Props> = ({ lessons }) => {
  const [passedNumbers, _] = useLocalStorage('passed-numbers', [])

  console.log(passedNumbers)
  return (
    <div className="main-content">
      <OptimizedHead title="Уроки" description={'Уроки по js для начинающих'} keywords={lessons.map(l => l.theme)} />
      <Header />
      <div className={s.lessons}>
        {lessons.map(l => {
          const isPassed = passedNumbers && passedNumbers.includes(l.num)
          return <LessonCard key={l.num} lesson={l} isPassed={isPassed} />
        })}
      </div>
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
