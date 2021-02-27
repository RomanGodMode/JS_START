import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { fetchLesson } from '~client/redux/lesson-page/actions'
import { useSelector } from '~client/shared/hooks/useAppSelector'
import { useLocalStorage } from '~client/shared/hooks/useLocalStorage'
import s from '~client/static/styles/pages-styles/lessons/lesson.module.scss'
import Head from 'next/head'
import LessonCaption from '~client/components/for-student/lesson/lesson-caption/lesson-caption'
import Container from '~client/shared/partials/Container/Container'
import TipsDisplayer from '~client/components/for-student/lesson/tips-displayer/tips-displayer'
import CodeEditor from '~client/components/for-student/lesson/code-editor/code-editor'
import { setIsPreviouslyPassed } from '~client/redux/lesson-page/lesson-page-slice'
import { NextThunkDispatch, wrapper } from '~client/pages/_app'

export const LessonPage = () => {
  const dispatch = useDispatch()

  const lesson = useSelector(state => state.lessonPage.lesson)

  const [nums] = useLocalStorage('passed-numbers', [])
  useEffect(() => {
    if (nums.includes(lesson.num)) dispatch(setIsPreviouslyPassed())
  }, [lesson.num])

  const isLessonPassedRightNow = useSelector(state => state.lessonPage.progress.isLessonPassedRightNow)
  const [_, setPassedNumbers] = useLocalStorage('passed-numbers', [])
  useEffect(() => {
    if (isLessonPassedRightNow) setPassedNumbers(nums => [...nums, lesson.num])
  }, [isLessonPassedRightNow])

  return (
    <div className={`main-content ${s.LessonPage}`}>
      <Head>
        <title>{lesson.theme}</title>
      </Head>

      <LessonCaption lessonName={lesson.theme} lessonNumber={lesson.num} />
      <Container>
        <TipsDisplayer tips={lesson.tooltips} />
        <CodeEditor />
      </Container>
    </div>
  )
}


