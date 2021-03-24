import React, { useEffect, useState } from 'react'
import { useSelector } from '~client/shared/hooks/useAppSelector'
import { useLocalStorage } from '~client/shared/hooks/useLocalStorage'
import s from '~client/static/styles/pages-styles/lessons/lesson.module.scss'
import LessonCaption from '~client/components/for-student/lesson/lesson-caption/lesson-caption'
import Container from '~client/shared/partials/Container/Container'
import TipsDisplayer from '~client/components/for-student/lesson/tips-displayer/tips-displayer'
import CodeEditor from '~client/components/for-student/lesson/code-editor/code-editor'
import { OptimizedHead } from '~client/components/seo/OptimizedHead'

export const LessonPage = () => {
  const lesson = useSelector(state => state.lessonPage.lesson)
  const isLessonPassedRightNow = useSelector(state => state.lessonPage.progress.isLessonPassedRightNow)

  const [nums, setPassedNumbers] = useLocalStorage('passed-numbers', [])
  const [isPreviouslyPassed, setIsPreviouslyPassed] = useState(false)

  useEffect(() => {
    if (nums.includes(lesson.num)) {
      setIsPreviouslyPassed(true)
    } else {
      setIsPreviouslyPassed(false)
    }
  }, [lesson.num])

  useEffect(() => {
    if (isLessonPassedRightNow && !nums.includes(lesson.num)) setPassedNumbers(nums => [...nums, lesson.num])
  }, [isLessonPassedRightNow])

  return (
    <div className={`main-content ${s.LessonPage}`}>
      <OptimizedHead title={lesson.theme} description={`Урок по ${lesson.theme}`} />

      <LessonCaption lessonName={lesson.theme} lessonNumber={lesson.num} isPreviouslyPassed={isPreviouslyPassed} />
      <Container>
        <TipsDisplayer tips={lesson.tooltips} />
        <CodeEditor isPreviouslyPassed={isPreviouslyPassed} />
      </Container>
    </div>
  )
}
