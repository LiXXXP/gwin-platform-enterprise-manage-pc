import axios from '../network'
import { ElLoading, ElMessage } from 'element-plus'
import { nextTick } from 'vue'

export interface Response<T = any> {
  code: number
  message: string
  data: T
}

export class Request {
  private url: string
  private params: any
  private needLoading = false
  private needMessage = false
  private needError = false

  public constructor(url: string, params: any) {
    this.url = url
    this.params = params
  }

  public showLoading(show: boolean) {
    this.needLoading = show
    return this
  }

  public showMessage(show: boolean) {
    this.needMessage = show
    return this
  }

  public useError(use: boolean) {
    this.needError = use
    return this
  }

  async start<T>(): Promise<T> {
    let loading: any
    let data: any
    try {
      // 根据需要显示loading
      if (this.needLoading) {
        loading = ElLoading.service({
          fullscreen: true
        })
      }
      const reponse = (await axios.post(this.url, { ...this.params }).catch((e) => {
        throw e
      })) as unknown as Response<T>
      const code = reponse && reponse.code
      if (code === 1) {
        data = reponse.data
      } else {
        if (this.needMessage) {
          ElMessage.error((reponse && reponse.message) || '接口错误，请联系管理员')
        }
      }
    } catch (e: any) {
      // 根据需要弹错误提示
      if (this.needMessage) {
        const msg = e.message || '网络异常，请稍后重试'
        msg && ElMessage.error(msg)
      }
      // 根据需要向外层跑错
      if (this.needError) {
        throw e
      }
    } finally {
      // 根据需要隐藏loading
      if (this.needLoading) {
        nextTick(() => {
          loading.close()
        })
      }
    }
    return data
  }
}
