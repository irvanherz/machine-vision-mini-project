import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config: any) => {
  if (config.method === 'get') config.params = { ...config.params, created: 1 }
  config.headers['app-id'] = process.env.REACT_APP_API_APPID
  return config
}, error => {
  Promise.reject(error)
})

export default axiosInstance
