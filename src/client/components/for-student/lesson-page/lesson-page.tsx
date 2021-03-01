import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { useSelector } from '~client/shared/hooks/useAppSelector'
import { useLocalStorage } from '~client/shared/hooks/useLocalStorage'
import s from '~client/static/styles/pages-styles/lessons/lesson.module.scss'
import Head from 'next/head'
import LessonCaption from '~client/components/for-student/lesson/lesson-caption/lesson-caption'
import Container from '~client/shared/partials/Container/Container'
import TipsDisplayer from '~client/components/for-student/lesson/tips-displayer/tips-displayer'
import CodeEditor from '~client/components/for-student/lesson/code-editor/code-editor'
import { clearLessonNum, setIsPreviouslyPassed } from '~client/redux/lesson-page/lesson-page-slice'
import { OptimizedHead } from "~client/components/seo/OptimizedHead";

export const LessonPage = () => {
  const lesson = useSelector(state => state.lessonPage.lesson)
  const dispatch = useDispatch()

  const [nums, setPassedNumbers] = useLocalStorage('passed-numbers', [])
  const isPreviouslyPassed = useSelector(state => state.lessonPage.progress.isPreviouslyPassed)

  //TODO: Чёртов HYDRATE
  useEffect(() => {
    return () => dispatch(clearLessonNum())
  }, [])

  useEffect(() => {
    if (nums.includes(lesson.num)) dispatch(setIsPreviouslyPassed())
  }, [lesson.num])

  const isLessonPassedRightNow = useSelector(state => state.lessonPage.progress.isLessonPassedRightNow)
  useEffect(() => {
    if (isLessonPassedRightNow) setPassedNumbers(nums => [...nums, lesson.num])
  }, [isLessonPassedRightNow])

  return (
    <div className={`main-content ${s.LessonPage}`}>
      <OptimizedHead title={lesson.theme} description={`Урок по ${lesson.theme}`} />

      <LessonCaption lessonName={lesson.theme} lessonNumber={lesson.num} />
      <Container>
        <TipsDisplayer tips={lesson.tooltips} />
        <CodeEditor />
      </Container>
    </div>
  )
}
