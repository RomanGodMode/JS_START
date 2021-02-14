import { userAPI } from '~client/dal/lessons.api'
import { Lesson } from '~shared/types/lesson'
import s from '~client/static/styles/pages-styles/lessons/lesson.module.scss'
import LessonCaption, { StepType } from '~client/components/for-student/lesson/lesson-caption/lesson-caption'
import CodeEditor from "~client/components/for-student/lesson/code-editor/code-editor";
import Container from "~client/shared/partials/Container/Container";
import Head from "next/head";
import React from "react";
import TipsDisplayer from "~client/components/for-student/lesson/tips-displayer/tips-displayer";

type Props = {
  lesson: Lesson
}

export default function LessonPage({ lesson }: Props) {
  const steps: StepType[] = lesson.stages.map(s => ({ title: s.title }))
  return (
    <div className={`main-content ${s.LessonPage}`}>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>
        <title>{lesson.theme}</title>
      </Head>
      <LessonCaption current={2} lessonName={lesson.theme} lessonNumber={lesson.num} stepsData={steps} />
      <Container>
      <TipsDisplayer tips={lesson.tooltips} />
        <CodeEditor/>
      {/*  TODO: Сделать крутую кнопку и адаптивную консоль */}
      </Container>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const num = params.num
  const lesson = await userAPI.getLesson(num)
  return {
    props: { lesson }
  }
}
