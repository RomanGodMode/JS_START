import Link from 'next/link'
import React from 'react'
import Container from '~client/shared/partials/Container/Container'
import s from './header.module.scss'
import { useAdmin } from "~client/shared/hooks/useAdmin";

const Header = () => {
  const {logout} = useAdmin()
  return (
    <header className={s.header}>
      <Container>
        <div className={s.list}>
          <Link href={'/cms/edit-lessons'}>Уроки</Link>
          <Link href={'/cms/register'}>Регистрация</Link>
          <a onClick={async (e) => {
            e.preventDefault()
            await logout()
          }}>Выйти</a>
        </div>
      </Container>
    </header>
  )
}

export default Header
