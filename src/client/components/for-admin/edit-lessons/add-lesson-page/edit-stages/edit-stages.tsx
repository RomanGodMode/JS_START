import React, { FC, useRef, useState } from 'react'
import s from './edit-stages.module.scss'
import { Card, Form, FormInstance } from 'antd'
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons'
import AddButton from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/add-button/add-button'
import EditStageModal from '~client/components/for-admin/edit-lessons/add-lesson-page/edit-stages/edit-stage-modal/edit-stage-modal'
import { StageWithoutNum } from '~shared/types/lesson'
import CaptionDivider from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/caption-divider'

type Props = {
  form: FormInstance
}

const replaceByIndex = (arr: any[], idx: number, element: any): any[] => {
  const result = [...arr]
  result.splice(idx, 1, element)
  return result
}

const EditStages: FC<Props> = ({ form }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onCancel = () => setIsVisible(false)
  const onOk = () => setIsVisible(false)

  const addRef = useRef()
  const [currentStage, setCurrentStage] = useState<StageWithoutNum>()

  const showAddModal = (add, currentStage: StageWithoutNum) => {
    setCurrentStage(currentStage)
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
      <EditStageModal initialStage={currentStage} visible={isVisible} onCancel={onCancel} onOk={onOk} onFinish={onFinish} />

      <CaptionDivider text={'Этапы'} />
      <Form.List
        name="stages"
        rules={[
          {
            validator: async (_, stages) => {
              if (!stages || stages.length < 3) {
                return Promise.reject(new Error('Необходимо по меньшей мере 3 этапа'))
              }
            }
          }
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key} className={s.stageItem}>
                <Form.Item style={{ width: '100%' }} shouldUpdate>
                  {() => {
                    const stages = form.getFieldsValue().stages
                    if (!stages) return <div>Бяк</div>
                    return <Card className={s.stageCard}>{`${index + 1} ${stages[index].title}`}</Card>
                  }}
                </Form.Item>
                <EditOutlined
                  onClick={() => {
                    const editStage = newStage => {
                      form.setFieldsValue({
                        stages: replaceByIndex(form.getFieldsValue().stages, index, newStage)
                      })
                    }
                    showAddModal(editStage, form.getFieldsValue().stages[index])
                  }}
                  style={{ marginLeft: 20, fontSize: 27, color: '#fff', transform: 'translateY(-50%)' }}
                />
                <MinusCircleOutlined
                  style={{ marginLeft: 20, fontSize: 27, color: '#fff', transform: 'translateY(-50%)' }}
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <AddButton
              add={() => {
                showAddModal(add, {title: '', answer: '', task: ''})
              }}
              text={'Добавить этап'}
            />
            <div style={{ paddingBottom: 30 }}>
              <Form.ErrorList errors={errors} />
            </div>
          </>
        )}
      </Form.List>
    </>
  )
}

export default EditStages
