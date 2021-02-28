import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { userAPI } from '~client/dal/lessons.api'
import { setLesson } from './lesson-page-slice'

export const fetchLesson = (num: number) => async (dispatch: Dispatch) => {

  const lesson = await userAPI.getLesson(num)
  dispatch(setLesson(lesson))
}
