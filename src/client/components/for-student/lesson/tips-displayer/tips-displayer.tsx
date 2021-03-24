import React from 'react'
import styles from './tips-displayer.module.scss'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import { useSelector } from '~client/shared/hooks/useAppSelector'

type Props = {
  tips: string[]
}

const TipsDisplayer: React.FC<Props> = ({ tips }) => {
  const currStage = useSelector(state => state.lessonPage.progress.currentStage)
  const currTask = useSelector(state => state.lessonPage.lesson.stages[currStage]?.task) || ''

  const tipsTabs = tips.map((t, i) => (
    <TabPane className={styles.tipBody} tab={i + 1} key={i + 1}>
      {t + 1}
    </TabPane>
  ))
  return (
    <div className={styles.TipsDisplayer}>
      <Tabs size={'large'} type="line">
        <TabPane className={styles.tipBody} tab={'Задание'} key={0}>
          {currTask}
        </TabPane>
        {tipsTabs}
      </Tabs>
    </div>
  )
}

export default TipsDisplayer
