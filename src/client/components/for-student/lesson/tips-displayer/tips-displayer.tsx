import React from 'react'
import styles from './TipsDisplayer.module.scss'
import { Tabs } from 'antd'
import Container from '~client/shared/partials/Container/Container'

const { TabPane } = Tabs
type Props = {
  tips: string[]
}

const TipsDisplayer: React.FC<Props> = ({ tips }) => {
  let i = 1
  const tipsTabs = tips.map(t => (
    <TabPane tab={i} key={i++}>
      {t}
    </TabPane>
  ))
  return (
    <Container>
      <div className={styles.TipsDisplayer}>
        <Tabs size={'large'} type="line">
          {tipsTabs}
        </Tabs>
      </div>
    </Container>
  )
}

export default TipsDisplayer
