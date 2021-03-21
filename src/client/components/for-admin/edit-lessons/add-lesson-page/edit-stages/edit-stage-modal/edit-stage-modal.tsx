import React, { FC } from 'react'
import s from './edit-stage-modal.module.scss'
import { Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { StageWithoutNum } from '~shared/types/lesson'
import useForm from 'antd/lib/form/hooks/useForm'

type Props = {
  initialStage?: StageWithoutNum
  visible: boolean
  onCancel: () => void
  onOk: () => void
  onFinish: (data: StageWithoutNum) => void
}

const EditStageModal: FC<Props> = ({ onFinish, initialStage, ...modalProps }) => {
  const [form] = useForm()

  if (initialStage) {
    form.setFieldsValue(initialStage)
  } else {
    form.setFieldsValue({ title: '', task: '', answer: '' })
  }

  return (
    <Modal className={s.modal} {...modalProps} footer={null}>
      <Form form={form} name="basic" onFinish={onFinish} className={s.form}>
        <h5 className={s.heading}>Создать этап</h5>
        <hr style={{ marginBottom: 10 }} />

        <Form.Item
          className={s.group}
          name={'title'}
          rules={[
            { required: true, message: 'Введите название этапа' },
            { max: 13, message: 'Название урока не должно быть таки длинным' }
          ]}
        >
          <Input placeholder={'Оглавление'} />
        </Form.Item>
        <Form.Item
          className={s.group}
          name={'task'}
          rules={[
            { required: true, message: 'Введите задачу' },
            { min: 11, message: 'Минимальная длина задачи 11 символов' }
          ]}
        >
          <TextArea style={{ height: 90 }} placeholder={'Текст задачи'} />
        </Form.Item>
        <Form.Item className={s.group} name={'answer'} rules={[{ required: true, message: 'Введите ответ' }]}>
          <Input placeholder={'Ответ на задачу'} />
        </Form.Item>

        <div style={{ paddingTop: 10 }}>
          <hr style={{ marginBottom: 20 }} />
        </div>

        <Button htmlType={'submit'} key={'вперед'} type={'primary'}>
          Добавить этап
        </Button>
      </Form>
    </Modal>
  )
}

export default EditStageModal
