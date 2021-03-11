import React, { FC } from 'react'
import { Button, Form } from 'antd'
import s from './add-button.module.scss'
import { PlusOutlined } from '@ant-design/icons'

type Props = {
  add: () => void
  text: string
}

const AddButton: FC<Props> = ({ add, text }) => {
  return (
    <Form.Item>
      <Button type="dashed" className={s.addButton + ' ' + s.addButtonText} onClick={() => add()} block icon={<PlusOutlined className={s.addButtonText} />}>
        {text}
      </Button>
    </Form.Item>
  )
}

export default AddButton
