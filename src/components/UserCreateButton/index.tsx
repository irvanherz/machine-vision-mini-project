import { Form, Modal, notification } from 'antd'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import { ApiData, ApiError } from '../../libs/api'
import UserService from '../../services/user'
import UserForm from '../shared/UserForm'

type UserCreateButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function UserCreateButton ({ children, afterCreated }: UserCreateButtonProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const creator = useMutation<ApiData, ApiError>(setData => UserService.create(setData))

  const handleToggleOpen = () => setOpen(!open)
  const handleSubmit = (values:any) => {
    creator.mutate(values, {
      onSuccess: () => {
        form.resetFields()
        afterCreated?.()
        handleToggleOpen()
      },
      onError: (err) => {
        notification.error({
          message: 'Error',
          description: err.message,
          duration: 3
        })
      }
    })
  }

  const handleValidationError = () => {
    notification.error({
      message: 'Error',
      description: 'Check all fields and then try again',
      duration: 3
    })
  }

  return (
    <>
      {children && cloneElement(children, { onClick: handleToggleOpen })}
      <Modal
        centered
        title="Create User"
        open={open}
        onCancel={handleToggleOpen}
        onOk={form.submit}
        okText="Create"
        okButtonProps={{ loading: creator.isLoading }}
        cancelButtonProps={{ disabled: creator.isLoading }}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={handleValidationError}
        >
          <UserForm />
        </Form>

      </Modal>
    </>
  )
}
