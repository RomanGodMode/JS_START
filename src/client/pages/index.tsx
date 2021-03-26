import React from 'react'
import { NextPage } from 'next'
import Header from '~client/components/for-student/header/header'
import { OptimizedHead } from '~client/components/seo/OptimizedHead'
import JsBenefit from '~client/components/landing/js-benefit/js-benefit'
import Container from '~client/shared/partials/Container/Container'
import s from '../static/styles/pages-styles/landing/index.module.scss'

type HomePageProps = {}

const Home: NextPage<HomePageProps> = () => {
  return (
    <div className={'main-content'}>
      <OptimizedHead title={'js-start'} description={'стань жаваскритизёром уже сейчас!'} />
      <Header />
      <Container>
        <h3 className={s.mainTitle}>5 причин учить именно javaScript</h3>
      </Container>
      <JsBenefit
        title={'JavaScript - один из самых популярных языков программирования'}
        text={
          'Согласно опросу разработчиков на StackOverflow 2020, JavaScript очень распространён среди программистов, причём уже восьмой год подряд. И это не только у новичков, напротив, среди профессионалов JavaScript программистов ещё больше.'
        }
      />
      <JsBenefit
        title={'JavaScript - вездесущ'}
        text={
          'Вы хотите заниматься фронтендом, бэкендом, а может сразу фул стеком? Хотите создавать сайты, десктопные или мобильные приложения? Что ж, сейчас всё это возможно с JavaScript.'
        }
      />
      <JsBenefit
        title={'JavaScript - язык браузеров'}
        text={
          'В современном фронтенде кроме javascript, мало какие языки котируются, с помощью современных фреймворком таких как react, angular,vue можно создавать прекрасные веб-приложения'
        }
      />
    </div>
  )
}

export default Home
