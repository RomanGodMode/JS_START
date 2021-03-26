import React, { FC } from 'react'
import Container from '~client/shared/partials/Container/Container'
import s from './js-benefit.module.scss'

type Props = {
  title: string
  text: string
}

const JsBenefit: FC<Props> = ({ title, text }) => {
  return (
    <Container className={s.JsBenefit}>
      <h5>{title}</h5>
      <p>{text}</p>
    </Container>
  )
}

export default JsBenefit
