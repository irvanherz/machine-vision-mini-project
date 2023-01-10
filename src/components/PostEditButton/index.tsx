import { Form, Modal, notification } from 'antd'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { ApiData, ApiError } from '../../libs/api'
import PostService from '../../services/post'
import PostForm from '../shared/PostForm'

type PostEditButtonProps = {
  postId: any,
  children: ReactElement
  afterUpdated?: () => void
}

export default function PostEditButton ({ postId, children, afterUpdated }: PostEditButtonProps) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const updater = useMutation<ApiData, ApiError>(setData => PostService.updateById(postId, setData))

  const { data } = useQuery(['post.details', postId], () => PostService.findById(postId), { enabled: open })
  const post: any = data?.data

  useEffect(() => {
    if (post) {
      const { owner, ...other } = post
      form.setFieldsValue({
        owner: owner.id,
        ...other
      })
    }
  }, [post])

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
        title="Edit Post"
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
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={handleValidationError}
        >
          <PostForm />
        </Form>

      </Modal>
    </>
  )
}
