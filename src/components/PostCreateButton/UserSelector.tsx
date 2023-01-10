import { Select, SelectProps } from 'antd'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import UserService from '../../services/user'

type UserSelectorProps = SelectProps
export default function UserSelector (props: UserSelectorProps) {
  const { data, isLoading } = useQuery(['user.list.selector'], () => UserService.findMany({ limit: 100 }))
  const users: any[] = data?.data || []

  const options = useMemo<SelectProps['options']>(() => {
    return users.map(user => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id
    }))
  }, [users])

  return (
    <Select options={options} {...props} loading={isLoading} />
  )
}
