import axios from 'axios'
import { Lesson, LessonHead } from '~shared/types/lesson'

const axiosInstance = axios.create({
  // withCredentials:true,
  baseURL: 'http://localhost:3000/api',// TODO: Подменять доменное имя для продакшена
  headers: {}
})
const lessonAPI = {
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
