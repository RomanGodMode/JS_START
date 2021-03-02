import { createSlice } from '@reduxjs/toolkit'
import { Lesson } from '~shared/types/lesson'
import { StepType } from '~client/components/for-student/lesson/lesson-caption/lesson-caption'
import { compile } from '~client/components/for-student/lesson/code-editor/compile'

const lessonsSlice = createSlice({
  name: 'lessonPage',
  initialState: {
    steps: [] as StepType[],
    lesson: {
      stages: [],
      tooltips: [],
      theme: 'Загрузка...',
      num: 0,
      theory: null
    } as Lesson,
    progress: {
      isLessonPassedRightNow: false,
      currentStage: 0,
      isCurrentPassed: false,
      isLast: false
    },
    result: ''
  },
  reducers: {
    setLesson(state, action) {
      state.lesson = action.payload
      state.result = ''
      state.progress.isLessonPassedRightNow = false
      state.progress.currentStage = 0
      state.progress.isCurrentPassed = false
      state.progress.isLast = false
      state.steps = state.lesson.stages.map(s => ({ title: s.title }))
    },
    compileJs(state, action) {
      state.result = compile(action.payload)
      if (state.result === state.lesson.stages[state.progress.currentStage].answer) {
        state.progress.isCurrentPassed = true
        if (state.progress.isLast) {
          state.progress.isLessonPassedRightNow = true
        }
      }
    },
    toNextStage(state) {
      if (state.progress.currentStage === state.lesson.stages.length - 2) {
        state.progress.isLast = true
      }
      state.progress.isCurrentPassed = false
      state.progress.currentStage++
    },
    backtrackStage(state, action) {
      //TODO:
    }
  }
})

export default lessonsSlice.reducer
export const { setLesson, compileJs, toNextStage, backtrackStage } = lessonsSlice.actions
