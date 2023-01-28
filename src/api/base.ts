import { Request, Response } from '@gwin/networking'

export class Api {
  // 获取验证码
  async AccountPinCodeApply(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/AccountPinCodeApply',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  //   验证码验证
  async AccountVerifySms(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/AccountVerifySms',
      params: params,
      isLoading: false,
      isMessage: true,
      isError: true
    })
    return await request.start()
  }

  // 获取个人信息
  async UserBasicInfoInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserBasicInfoInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 企业菜单资源
  async UserSubjectResourceListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserSubjectResourceListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
