import axios from 'axios'
import { Lesson, LessonHead } from '~shared/types/lesson'

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {}
})

export const lessonAPI = {
  async getLessons(): Promise<LessonHead[]> {
    return axiosInstance.get('lessons').then(res => res.data)
  },
  async getLesson(num: number): Promise<Lesson> {
    return axiosInstance.get(`lessons/${num}`).then(res => res.data)
  }
}

export const userAPI = {
  ...lessonAPI
}

export const adminAPI = {
  ...lessonAPI
}
