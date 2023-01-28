/*
 * @Author: Jin Biao
 * @Date: 2022-01-04 10:51:14
 * @LastEditTime: 2022-01-05 14:52:11
 * @Description:
 */
import { Request, Response } from '@gwin/networking'

export class Api {
  async ProductApplyVerification(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserProductApply',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 查下我的产品列表
  async UserProductActivedListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserProductActivedListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 开通日志
  async SubjectProductLogListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectProductLogListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 查询产品详情
  async SubjectProductInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectProductInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 查询申请列表
  async SubjectProductApplyListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectProductApplyListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 申请详情
  async SubjectProductApplyInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectProductApplyInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
