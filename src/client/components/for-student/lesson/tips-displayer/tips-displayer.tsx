import React from 'react'
import styles from './tips-displayer.module.scss'
import { Tabs } from 'antd'
import Container from '~client/shared/partials/Container/Container'

const { TabPane } = Tabs
type Props = {
  tips: string[]
}

const TipsDisplayer: React.FC<Props> = ({ tips }) => {
  const tipsTabs = tips.map((t, i) => (
    <TabPane className={styles.tipBody} tab={i + 1} key={i + 1}>
      {t + 1}
    </TabPane>
  ))
  return (
    <div className={styles.TipsDisplayer}>
      <Tabs size={'large'} type="line">
        {tipsTabs}
      </Tabs>
    </div>
  )
}

export default TipsDisplayer
