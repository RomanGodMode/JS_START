import s from '~client/static/styles/pages-styles/auth.module.scss'
import Header from '~client/components/for-student/header/header'
import AdminHeader from '~client/components/for-admin/header/header'
import { Button, Checkbox, Form, Input } from 'antd'
import Container from '~client/shared/partials/Container/Container'
import { FC } from 'react'

type Props = {
  isLogin: boolean
}

const AuthPage: FC<Props> = ({ isLogin }) => {
  const login = values => {
    const { username, password, remember } = values
    console.log('login')
  }
  const register = values => {
    const { username, password } = values
    console.log('register')
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
          {isLogin && (
            <Form.Item name={'remember'} valuePropName="checked">
              <Checkbox className={s.checkBox}>Запомнить меня</Checkbox>
            </Form.Item>
          )}
          <Button style={!isLogin ? { marginTop: 40 } : {}} block htmlType={'submit'} className={s.authButton} type={'primary'}>
            {isLogin ? 'Войти' : 'Зарегистрировать'}
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default AuthPage
