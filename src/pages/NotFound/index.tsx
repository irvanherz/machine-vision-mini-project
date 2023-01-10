import { Button, Result, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import BlankLayout from '../../components/BlankLayout'

export default function NotFound () {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)
  const handleHome = () => navigate('/')

  return (
    <BlankLayout>
      <Result
        status='404'
        title="Not Found"
        subTitle="The page you requested was not found"
        extra={
          <Space>
            <Button onClick={handleHome}>Back to Home</Button>
            <Button type="primary" onClick={handleBack}>Back to Previous Page</Button>
          </Space>
        }
      />
    </BlankLayout>
  )
}
