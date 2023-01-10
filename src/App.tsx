import { ConfigProvider, theme } from 'antd'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import useThemeContext from './hooks/useThemeContext'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PostManager from './pages/PostManager'
import UserManager from './pages/UserManager'

const router = createBrowserRouter([
  {
    id: '/',
    path: '/',
    element: <Home />
  },
  {
    id: '/users',
    path: '/users',
    element: <UserManager />
  },
  {
    id: '/posts',
    path: '/posts',
    element: <PostManager />
  },
  {
    id: '*',
    path: '*',
    element: <NotFound />
  }
])

function App () {
  const tc = useThemeContext()
  const algorithm = tc.theme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm

  return (
    <div className="App">
      <ConfigProvider theme={{ algorithm }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )
}

export default App
