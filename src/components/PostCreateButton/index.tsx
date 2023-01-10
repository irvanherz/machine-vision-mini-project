import { Form, Modal, notification } from 'antd'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import { ApiData, ApiError } from '../../libs/api'
import PostService from '../../services/post'
import PostForm from '../shared/PostForm'

type PostCreateButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function PostCreateButton ({ children, afterCreated }: PostCreateButtonProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const creator = useMutation<ApiData, ApiError>(setData => PostService.create(setData))

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
  return (
    <>
      {children && cloneElement(children, { onClick: handleToggleOpen })}
      <Modal
        centered
        title="Create Post"
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
          form={form} onFinish={handleSubmit}
        >
          <PostForm />
        </Form>

      </Modal>
    </>
  )
}
