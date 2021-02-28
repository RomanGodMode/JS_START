import { AnyAction, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import lessonsSlice from './lesson-page/lesson-page-slice'
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";

const rootReducer = combineReducers({
  lessonPage: lessonsSlice
})
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export const store = configureStore({
  reducer
})

const makeStore: MakeStore<RootState> = (context) => store
export const wrapper = createWrapper<RootState>(makeStore)






export type RootState = ReturnType<typeof rootReducer>
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>


