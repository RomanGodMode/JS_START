import React from 'react'
import s from './edit-tips.module.scss'
import { Button, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import AddButton from "~client/components/for-admin/edit-lessons/add-lesson-page/partials/add-button/add-button";
import CaptionDivider from "~client/components/for-admin/edit-lessons/add-lesson-page/partials/caption-divider";

const EditTips = () => {
  return (
    <>
      <CaptionDivider text={'Подсказки'} />
      <Form.List name="tips">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <div key={field.key} className={s.tipItem}>
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
          </>
        )}
      </Form.List>
    </>
  )
}

export default EditTips
