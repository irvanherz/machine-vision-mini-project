import { Modal, notification } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import { ApiData, ApiError } from '../../libs/api'
import PostService from '../../services/post'

type PostDeleteButtonProps = {
  post: any
  afterDeleted?: (post: any) => void
  children: ReactElement
}
export default function PostDeleteButton ({ post, afterDeleted, children }: PostDeleteButtonProps) {
  const destroyer = useMutation<ApiData, ApiError>(() => PostService.deleteById(post.id))
  const handleClick = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure to delete this post?',
      onOk: async () => {
        try {
          await destroyer.mutateAsync()
          afterDeleted?.(post)
        } catch (err: any) {
          notification.error({
            message: 'Error',
            description: err?.message || 'Something went wrong',
            duration: 3
          })
        }
      }
    })
  }
  return cloneElement(children, { onClick: handleClick })
}
