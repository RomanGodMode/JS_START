import Link from 'next/link'
import React from 'react'
import Container from '~client/shared/partials/Container/Container'
import s from './header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.list}>
          <Link href={'/cms/edit-lessons'}>Уроки</Link>
          <Link href={'/cms/register'}>Регистрация</Link>
          <Link href={'/cms'}>Выйти</Link>
        {/*  TODO: Выйти*/}
        </div>
      </Container>
    </header>
  )
}

export default Header
