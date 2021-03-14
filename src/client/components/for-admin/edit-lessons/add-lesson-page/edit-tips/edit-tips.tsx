import React from 'react'
import s from './edit-tips.module.scss'
import { Form } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import AddButton from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/add-button/add-button'
import CaptionDivider from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/caption-divider'

const EditTips = () => {
  return (
    <>
      <CaptionDivider text={'Подсказки'} />
      <Form.List
        name="tips"
        rules={[
          {
            validator: async (_, tips) => {
              if (!tips || tips.length < 1) {
                return Promise.reject(new Error('Необходима по меньшей мере 1 подсказка'))
              }
            }
          }
        ]}
      >
        {(fields, { add, remove }, {errors}) => (
          <>
            {fields.map(field => (
              <div key={field.key} className={s.stageItem}>
                <Form.Item
                  style={{ width: '100%' }}
                  {...field}
                  name={[field.name, 'tipText']}
                  fieldKey={[field.fieldKey, 'tipText']}
                  rules={[{ required: true, message: 'Введите подсказку' }]}
                >
                  <TextArea className={s.textarea} placeholder="текст подсказки" />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ marginLeft: 20, fontSize: 27, color: '#fff', transform: 'translateY(-50%)' }}
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <AddButton add={add} text={'Добавить подсказку'} />
            <div style={{paddingBottom:30}}><Form.ErrorList errors={errors}/></div>
          </>
        )}
      </Form.List>
    </>
  )
}

export default EditTips
