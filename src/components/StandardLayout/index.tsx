import {
  BookOutlined,
  HomeFilled, LeftOutlined, RightOutlined, UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, Segmented, theme } from 'antd'
import { ReactNode, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useThemeContext from '../../hooks/useThemeContext'

const StyledLayout = styled(Layout)`
min-height: 100vh;
.standard-layout-menu {
  display: flex;
  flex-direction: column;
  height: inherit;
  .standard-layout-menu-1 {
    flex: 1;
  }
  .standard-layout-menu-2 {
    flex: 0;
    position: sticky;
    bottom: 0;
  }
}
.standard-layout-menu-main {
  padding: 8px;
  position: sticky;
  top: 0;
}
.standard-layout-menu-toggler {
  height: 32px;
  background: rgba(255,255,255,0.1);
  border: none;
  cursor: pointer;
  display: block;
  width: 100%;
  color: #FFF;
}
.standard-layout-header {
  display: flex;
  .standard-layout-header-1 {
    flex: 1
  }
  .standard-layout-header-2 {
    flex: 0;
    padding-left: 8px;
  }
}
`
type StandardLayoutProps = {
  children: ReactNode
  headerExtra?: ReactNode
}

export default function StandardLayout ({ children, headerExtra }: StandardLayoutProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const tc = useThemeContext()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const handleToggleCollapseMenu = () => setCollapsed(!collapsed)

  return (
    <StyledLayout>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='standard-layout-menu'>
          <div className='standard-layout-menu-1'>
            <Menu
              className='standard-layout-menu-main'
              theme="dark"
              mode="inline"
              selectedKeys={[pathname]}
              items={[
                {
                  key: '/',
                  icon: <HomeFilled />,
                  label: 'Home',
                  onClick: () => navigate('/')
                },
                {
                  key: '/users',
                  icon: <UserOutlined />,
                  label: 'User',
                  onClick: () => navigate('/users')
                },
                {
                  key: '/posts',
                  icon: <BookOutlined />,
                  label: 'Post',
                  onClick: () => navigate('/posts')
                }
              ]}
            />
          </div>
          <div className='standard-layout-menu-2'>
            <button className='standard-layout-menu-toggler' onClick={handleToggleCollapseMenu}>{collapsed ? <RightOutlined /> : <LeftOutlined />}</button>
          </div>
        </div>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header style={{ background: colorBgContainer }} className='standard-layout-header'>
          <div className='standard-layout-header-1'>{headerExtra}</div>
          <div className='standard-layout-header-2'>
            <Segmented value={tc.theme} onChange={tc.setTheme as any} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
          </div>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </StyledLayout>
  )
}
