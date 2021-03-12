import s from '~client/static/styles/pages-styles/auth.module.scss'
import Header from '~client/components/for-student/header/header'
import AdminHeader from '~client/components/for-admin/header/header'
import { Button, Checkbox, Form, Input } from 'antd'
import Container from '~client/shared/partials/Container/Container'
import { FC, useEffect, useState } from 'react'
import { useAdmin } from '~client/shared/hooks/useAdmin'
import { useRouter } from 'next/router'

type Props = {
  isLogin: boolean
}
const AuthPage: FC<Props> = ({ isLogin }) => {
  const { admin, authorize } = useAdmin()
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()

  const login = async values => {
    const { username, password } = values
    const token = await admin.login(username, password)
    if (token) {
      authorize(token)
      setError('')
      await router.push('/cms/edit-lessons')
    } else setError('Не удалось авторизироваться')
  }

  const register = async values => {
    const { username, password } = values
    const successed = await admin.register(username, password)
    if (successed) {
      setIsSuccess(true)
      setError('')
    } else {
      setError('Не удалось создать пользователя, скорее всего пользователь с таким именем уже существует')
      setIsSuccess(false)
    }
  }

  return (
    <div className={`main-content ${s.AuthPage}`}>
      {isLogin ? <Header /> : <AdminHeader />}
      <Container className={s.Container}>
        <Form className={s.authForm} initialValues={{ remember: true }} onFinish={isLogin ? login : register}>
          <h3>{isLogin ? 'Войти' : 'Регистрация'}</h3>
          <hr />
          <Form.Item className={s.formGroup} rules={[{ required: true, message: 'Пожалуйста введите логин' }]} name={'username'}>
            <Input className={s.authInput} placeholder={'Логин'} />
          </Form.Item>
          <Form.Item className={s.formGroup} name={'password'} rules={[{ required: true, message: 'Пожалуйста введите логин' }]}>
            <Input className={s.authInput} placeholder={'Пароль'} />
          </Form.Item>
          <Form.Item className={s.formGroup}>
            <Button block htmlType={'submit'} className={s.authButton} type={'primary'}>
              {isLogin ? 'Войти' : 'Зарегистрировать'}
            </Button>
          </Form.Item>
        </Form>
        {error && <div className={s.error}>{error}</div>}
        {isSuccess && <div className={s.success}>Молодец, зарегал админа!</div>}
      </Container>
    </div>
  )
}

export default AuthPage
