import s from '../static/styles/pages-styles/auth.module.scss'
import Header from '~client/components/for-student/header/header'
import { Input, Button } from 'antd'
import Container from '~client/shared/partials/Container/Container'
import { FC } from 'react'

type Props = {
  isLogin: boolean
}

const AuthPage:FC<Props> = ({isLogin}) => {

  console.log(isLogin);
  return (
    <div className={`main-content ${s.AuthPage}`}>
      <Header />
      <Container className={s.Container}>
        <form className={s.authForm}>
          <h3>Авторизация</h3>
          <Input className={s.authInput} placeholder={'Логин'} />
          <Input className={s.authInput} placeholder={'Пароль'} />
          <Button className={s.authButton} type={'primary'}>
            Зарегистрировать
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default AuthPage
