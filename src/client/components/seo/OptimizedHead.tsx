import React, { FC } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  description?: string
  keywords?: string[]
}

export const OptimizedHead: FC<Props> = ({ title, description, keywords }) => (
  <Head>
    <meta name="robots" content="index, follow" />
    <title>{title}</title>
    <meta name="description" content={description || 'Крутые уроки'} />
    <meta name="keywords" content={keywords ? keywords.join(', ') : 'Уроки, js, джаваскрипт'} />
  </Head>
)
