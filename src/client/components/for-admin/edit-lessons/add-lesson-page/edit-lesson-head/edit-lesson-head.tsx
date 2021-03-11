import React from 'react'
import s from './edit-lesson-head.module.scss'
import { Col, Form, Input, InputNumber, Row } from 'antd'

const EditLessonHead = () => {
  return (
    <div className={s.EditLessonHead}>
      <Form.Item rules={[{ required: true, message: 'Введите номер урока' }]} name={'num'} className={s.formGroup}>
        <InputNumber style={{ width: '100%' }} min={0} placeholder={'Номер Урока'} />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Введите загаловок урока' }]} name={'title'} className={s.formGroup}>
        <Input placeholder={'Загаловок Урока'} />
      </Form.Item>
    </div>
  )
}

export default EditLessonHead
