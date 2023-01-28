
import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

const downloadBlob = (response: AxiosResponse<any>) => {
  const blob = response.data
  const disposition = response.headers['content-disposition']
  let filename = ''
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  const matches = filenameRegex.exec(disposition)
  if (matches !== null && matches[1]) {
    filename = matches[1].replace(/['"]/g, '')
  }
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = (e) => {
    const a = document.createElement('a')
    a.download = filename
    a.href = (e.target && e.target.result) as string
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    if (
      (response.headers && response.headers['content-type'] === 'application/octet-stream; charset=utf-8') ||
      response.headers['content-type'] === 'application/x-msdownload' ||
      response.headers['content-type'] === 'application/x-download' ||
      response.headers['content-type'] === 'application/vnd.ms-excel' ||
      response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      if (response.request.responseType === 'blob') {
        downloadBlob(response)
      }
      return response.data
    }
    return response.data
  },
  (error) => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
