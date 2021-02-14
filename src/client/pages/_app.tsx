import App, { AppProps, AppContext } from 'next/app'
import '../static/styles/main.scss'
import 'antd/dist/antd.css'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <>
      <Head><link rel="shortcut icon" href="https://faviconka.ru/ico/1/faviconka.ru_1_100079.ico" /></Head>
      <Component {...pageProps} />
    </>
}

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
