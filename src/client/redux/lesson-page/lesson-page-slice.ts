import { createSlice } from '@reduxjs/toolkit'
import { Lesson } from '~shared/types/lesson'

const lessonsSlice = createSlice({
  name: 'lessonPage',
  initialState: {
    lesson: {
      stages: [],
      tooltips: [],
      theme: 'Загрузка...',
      num: 0,
      theory: null
    } as Lesson
  },
  reducers: {
    setLesson(state, action) {
      state.lesson = action.payload
    }
  }
})

export default lessonsSlice.reducer
export const { igor } = lessonsSlice.actions

export const fetchLesson = () => async dispatch => {
  
}
