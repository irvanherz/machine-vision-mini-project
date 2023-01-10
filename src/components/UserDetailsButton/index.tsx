import { Avatar, Drawer, Space, Tag, Typography } from 'antd'
import { cloneElement, ReactElement, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import UserService from '../../services/user'
import ContentGateway from '../ContentGateway'

type UserDetailsButtonProps = {
  userId: any
  children: ReactElement
}

export default function UserDetailsButton ({ userId, children }: UserDetailsButtonProps) {
  const [open, setOpen] = useState(false)
  const { data, error, status } = useQuery(['user.details', userId], () => UserService.findById(userId), { enabled: open })

  const user: any = data?.data || {}

  const handleToggleOpen = () => setOpen(!open)

  const renderedTags = useMemo(() => (user?.tags ? user.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>) : null), [user])

  return (
    <>
      {cloneElement(children, { onClick: handleToggleOpen })}
      <Drawer onClose={handleToggleOpen} open={open}>
        <ContentGateway data={data} error={error} status={status} >
          <Space direction="vertical" align='center'>
            <Avatar src={user.picture} shape='square' size={128} />
            <Typography.Title level={2}>{user.firstName} {user.lastName}</Typography.Title>
            <Typography.Text strong>{user.email}</Typography.Text>
            <div>
              {renderedTags}
            </div>
          </Space>
        </ContentGateway>

      </Drawer>
    </>
  )
}
