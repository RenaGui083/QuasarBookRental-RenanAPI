// import { boot } from 'quasar/wrappers'
// import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:9090',
//   headers: { "Content-Type": "application/json" }
// })

// const token = localStorage.getItem('authToken')
// if (token) {
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// export default boot(({ app }) => {
//   app.config.globalProperties.$api = api
//   app.provide('api', api)
// })

// export { api }

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9090',
  headers: { "Content-Type": "application/json" }
})

api.interceptors.request.use(config => {
  if (config.url === '/auth/login') {
    return config
  }

  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { api }

