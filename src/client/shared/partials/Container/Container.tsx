import React from 'react'
import styles from './Container.module.scss'

const Container = (props: React.PropsWithChildren<{ className?: string }>) => {
  return <div className={`${styles.container} ${props.className}`}>{props.children}</div>
}

export default Container
