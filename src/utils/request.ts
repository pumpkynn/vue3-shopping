import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '../store/modules/user'
// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore() // 每次请求时获取，避免循环依赖
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理网络错误
    let msg = ''
    let status = error.response?.status

    // 处理超时错误

    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }

    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
