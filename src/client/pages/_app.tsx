import App, { AppProps, AppContext } from 'next/app'
import '../static/styles/main.scss'
import 'antd/dist/antd.css'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { RootState, store, wrapper } from "~client/redux/store";
import { AnyAction, createStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>js-start</title>
        <link rel="shortcut icon" href="https://faviconka.ru/ico/1/faviconka.ru_1_100079.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}


// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default wrapper.withRedux(MyApp)


