import Link from 'next/link'
import React from 'react'
import Container from '~client/shared/partials/Container/Container'
import s from './header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.list}>
          <Link href={'/lessons'}>Уроки</Link>
          <Link href={'/'}>Лендинг</Link>
          <Link href={'/cms/login'}>Админу</Link>
        </div>
      </Container>
    </header>
  )
}

export default Header
