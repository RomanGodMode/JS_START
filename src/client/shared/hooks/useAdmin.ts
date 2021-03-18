import { useLocalStorage } from '~client/shared/hooks/useLocalStorage'
import { useCallback, useEffect, useState } from 'react'
import { basicHost, lessonAPI } from '~client/dal/lessons.api'
import { Lesson } from '~shared/types/lesson'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'

const mutant = { ...basicHost }

const admin = {
  ...lessonAPI,
  async register(login: string, password: string): Promise<boolean> {
    return mutant
      .post(`auth/register`, { login, password })
      .then(() => true)
      .catch(() => false)
  },
  async login(login: string, password: string): Promise<string> {
    return mutant
      .post(`auth/login`, { login, password })
      .then(d => d.data.accessToken)
      .catch(() => '')
  },
  async createLesson(lesson: Lesson) {
    return mutant.post(`lessons`, lesson).then(d => d.data)
  },
  async patchLesson(lesson: Lesson) {
    return mutant.put(`lessons/${lesson.num}`, lesson).then(d => d.data)
  },
  async deleteLesson(num: number) {
    return mutant
      .delete(`lessons/${num}`)
      .then(() => console.log('ЫЫЫЫЫЫЫ'))
      .catch(e => console.log(e))
  }
}

type DecodedToken = {
  exp: number
}

const tokenIsDead = (token: string): boolean => {
  return jwtDecode<DecodedToken>(token).exp * 1000 <= Date.now()
}

export function useAdmin() {
  const [token, setToken] = useLocalStorage('admin-token', '')

  useEffect(() => {
    mutant.defaults.headers.common['Authorization'] = token
  }, [token])

  const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(() => (token ? setIsAuthorized(true) : setIsAuthorized(false)), [token])

  const router = useRouter()

  const authorize = useCallback(
    (token: string) => {
      setToken(`Bearer ${token}`)
    },
    [token]
  )

  const logout = useCallback(async () => {
    setToken('')
    await router.push('/lessons')
  }, [])

  const useAutorizePage = useCallback(() => {
    useEffect(() => {
      if (!token || tokenIsDead(token)) {
        router.push('/cms/login').then()
      }
    }, [token])
  }, [token])

  return { admin, isAuthorized, authorize, logout, useAutorizePage }
}
