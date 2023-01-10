import { Form, Modal, notification } from 'antd'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { ApiData, ApiError } from '../../libs/api'
import UserService from '../../services/user'
import UserForm from '../shared/UserForm'

type UserEditButtonProps = {
  userId: any,
  children: ReactElement
  afterUpdated?: () => void
}

export default function UserEditButton ({ userId, children, afterUpdated }: UserEditButtonProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const { data } = useQuery(['user.details', userId], () => UserService.findById(userId), { enabled: open })
  const user: any = data?.data
  const updater = useMutation<ApiData, ApiError>(setData => UserService.updateById(userId, setData))

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user
      })
    }
  }, [user])

  const handleToggleOpen = () => setOpen(!open)
  const handleSubmit = (values:any) => {
    updater.mutate(values, {
      onSuccess: () => {
        afterUpdated?.()
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
  return (
    <>
      {children && cloneElement(children, { onClick: handleToggleOpen })}
      <Modal
        centered
        title="Edit User"
        open={open}
        onCancel={handleToggleOpen}
        onOk={form.submit}
        okText="Edit"
        okButtonProps={{ loading: updater.isLoading }}
        cancelButtonProps={{ disabled: updater.isLoading }}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form} onFinish={handleSubmit}
        >
          <UserForm />
        </Form>

      </Modal>
    </>
  )
}
