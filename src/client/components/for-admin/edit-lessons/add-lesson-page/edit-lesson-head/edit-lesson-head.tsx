import React from 'react'
import s from './edit-lesson-head.module.scss'
import { Form, Input, InputNumber } from 'antd'

const EditLessonHead = () => {
  return (
    <div className={s.EditLessonHead}>
      <Form.Item rules={[{ required: true, message: 'Введите номер урока' }]} name={'num'} className={s.formGroup}>
        <InputNumber style={{ width: '100%' }} min={1} max={1000} placeholder={'Номер Урока'} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: 'Введите загаловок урока' },
          { min: 2, message: 'Загаловок урока должен быть длиной минимум 2 символа' }
        ]}
        name={'theme'}
        className={s.formGroup}
      >
        <Input placeholder={'Загаловок Урока'} />
      </Form.Item>
    </div>
  )
}

export default EditLessonHead
