import { Modal, notification } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import { ApiData, ApiError } from '../../libs/api'
import UserService from '../../services/user'

type UserDeleteButtonProps = {
  user: any
  afterDeleted?: (user: any) => void
  children: ReactElement
}
export default function UserDeleteButton ({ user, afterDeleted, children }: UserDeleteButtonProps) {
  const destroyer = useMutation<ApiData, ApiError>(() => UserService.deleteById(user.id))
  const handleClick = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure to delete this user?',
      onOk: async () => {
        try {
          await destroyer.mutateAsync()
          afterDeleted?.(user)
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
