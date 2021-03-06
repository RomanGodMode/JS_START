import React, { FC, useState } from "react";
import s from './add-theory.module.scss'
import { Form, FormInstance } from "antd";
import AddButton from '../partials/add-button/add-button'
import TextArea from 'antd/lib/input/TextArea'
import CaptionDivider from '~client/components/for-admin/edit-lessons/add-lesson-page/partials/caption-divider'
import { MinusCircleOutlined } from '@ant-design/icons'

type Props = {
  form: FormInstance
  hasTheory: boolean
}


const AddTheory: FC<Props> = ({form, hasTheory}) => {
  const [theoryNeed, setTheoryNeed] = useState(hasTheory)

  return (
    <>
      <CaptionDivider text={'Теория'} />
      <div>
        {theoryNeed ? (
          <div className={s.theoryModule}>
            <Form.Item style={{ width: '100%' }} name={'theory'} rules={[{ required: true, message: 'Если не хотите добавлять теорию нажмите на минусик' }]}>
              <TextArea placeholder={'Теория к уроку'} />
            </Form.Item>
            <MinusCircleOutlined className={s.minus} onClick={() => {
              form.setFieldsValue({theory: ''})
              setTheoryNeed(false);
            }} />
          </div>
        ) : (
          <AddButton text={'Добавить Теорию'} add={() => setTheoryNeed(true)} />
        )}
      </div>
    </>
  )
}

export default AddTheory
