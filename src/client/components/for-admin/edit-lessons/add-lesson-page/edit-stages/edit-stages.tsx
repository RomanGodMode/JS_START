import React, { FC, useRef, useState } from 'react'
import s from '../edit-tips/edit-tips.module.scss'
import { Card, Form, FormInstance } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import AddButton from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/add-button/add-button'
import EditStageModal from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-stages/edit-stage-modal/edit-stage-modal'
import { StageWithoutNum } from '~shared/types/lesson'
import CaptionDivider from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/caption-divider'

type Props = {
  form: FormInstance
}

const EditStages: FC<Props> = ({ form }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onCancel = () => setIsVisible(false)
  const onOk = () => setIsVisible(false)

  const addRef = useRef()

  const showAddModal = (add: (stage: StageWithoutNum, insertIndex: number) => void) => {
    // @ts-ignore
    addRef.current = add
    setIsVisible(true)
  }
  const onFinish = (data: StageWithoutNum) => {
    // @ts-ignore
    addRef.current(data)
    onOk()
  }

  return (
    <>
      {/*TODO: Доделать вёрстку Этапов*/}
      <EditStageModal visible={isVisible} onCancel={onCancel} onOk={onOk} onFinish={onFinish} />

      <CaptionDivider text={'Этапы'} />
      <Form.List name="stages">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key} className={s.tipItem}>
                <Form.Item shouldUpdate>
                  {() => {
                    return <Card>{`${index + 1} ${form.getFieldsValue().stages[index].title}`}</Card>
                  }}
                </Form.Item>
                <MinusCircleOutlined
                  style={{ marginLeft: 20, fontSize: 27, color: '#fff', transform: 'translateY(-50%)' }}
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <AddButton
              add={() => {
                showAddModal(add)
              }}
              text={'Добавить этап'}
            />
          </>
        )}
      </Form.List>
    </>
  )
}

export default EditStages
