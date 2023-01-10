import { PlusOutlined } from '@ant-design/icons'
import { Button, notification, Pagination, Space, Table } from 'antd'
import QueryString from 'qs'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ContentGateway from '../../components/ContentGateway'
import StandardLayout from '../../components/StandardLayout'
import UserCreateButton from '../../components/UserCreateButton'
import UserDeleteButton from '../../components/UserDeleteButton'
import UserDetailsButton from '../../components/UserDetailsButton'
import UserEditButton from '../../components/UserEditButton'
import useQueryFilters from '../../hooks/useQueryFilters'
import UserService from '../../services/user'
import UserPhoto from './UserPhoto'

const { Column } = Table

type UserType = {
  id: any
  firstName: string
  lastName: string
  picture: string
}

export default function UserManager () {
  const navigate = useNavigate()
  const [filters] = useQueryFilters()
  const { data, refetch, error, status } = useQuery(['user.list', filters.page], () => UserService.findMany({ page: filters.page }))
  const users: any = data?.data || []
  const meta = data?.meta || {}
  const totalPages = Math.ceil(meta.total / (meta.limit || 1))

  const handleAfterUpdated = () => {
    notification.success({
      message: 'Success',
      description: 'User updated successfully',
      duration: 3
    })
    refetch()
  }

  const handleAfterDeleted = () => {
    notification.success({
      message: 'Success',
      description: 'User deleted successfully',
      duration: 3
    })
    refetch()
  }

  const handleAfterCreated = () => {
    notification.success({
      message: 'Success',
      description: 'User created successfully',
      duration: 3
    })
    refetch()
  }

  const handleChangePage = (page: any) => {
    const q = { ...filters, page: page - 1 }
    navigate(QueryString.stringify(q, { addQueryPrefix: true }), { replace: true })
  }

  return (
    <StandardLayout
      headerExtra={<UserCreateButton afterCreated={handleAfterCreated}><Button icon={<PlusOutlined />}>Create New User</Button></UserCreateButton>}
    >
      <ContentGateway data={data} error={error} status={status}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Table dataSource={users} pagination={false}>
            <Column
              title="Name"
              dataIndex="picture"
              key="picture"
              render={(_, user: UserType) => (
                `${user.firstName} ${user.lastName}`
              )}
              width={360}
            />
            <Column
              title="Picture"
              dataIndex="picture"
              key="picture"
              render={(_, user: UserType) => (
                <UserPhoto src={user.picture} style={{ minWidth: 64, maxWidth: 96 }} />
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(_, user: UserType) => (
                <Space size="middle">
                  <UserDetailsButton userId={user.id}><a>View</a></UserDetailsButton>
                  <UserEditButton userId={user.id} afterUpdated={handleAfterUpdated}><a>Edit</a></UserEditButton>
                  <UserDeleteButton user={user} afterDeleted={handleAfterDeleted}><a>Delete</a></UserDeleteButton>
                </Space>
              )}
            />
          </Table>
          <Pagination
            style={{ textAlign: 'center', display: meta.total ? 'block' : 'none' }}
            current={meta.page + 1}
            total={totalPages}
            onChange={handleChangePage}
          />
        </Space>
      </ContentGateway>
    </StandardLayout>
  )
}
