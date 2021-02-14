import React, { FC } from "react";
import { NextPage } from 'next'
import { LessonHead } from '~shared/types/lesson'
import { userAPI } from '~client/dal/lessons.api'
import s from '../../static/styles/pages-styles/lessons/index.module.scss'

import Head from 'next/head'
import Link from 'next/link'
import Header from "~client/components/for-student/header/header";

type LessonCardProps = {
  lesson: LessonHead
}

const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className={s.lesson}>
      <Link href={`/lessons/${lesson.num}`}>
        <div className={s.lessonCardBody}>
          <span className={s.text}>{lesson.num}. {lesson.theme}</span>
          <i className="fas fa-arrow-right"/>
        </div>
      </Link>
    </div>
  );
};


type Props = {
  lessons: LessonHead[]
}

const Index: NextPage<Props> = ({ lessons }) => {
  return (
    <div className='main-content'>
      <Head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>
        <title>Выбрать урок</title>
      </Head>
      <Header />
      <div className={s.lessons}>
        {lessons.map(l => <LessonCard key={l.num} lesson={l}/>)}
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
