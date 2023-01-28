import { Request, Response } from '@gwin/networking'

export class Api {
  // 开通列表
  async UserProductActivedListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserProductActivedListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 开通记录
  async SubjectProductApplyListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectProductApplyListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 产品分类列表
  async ProductCategoryListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/saas/v1/ProductCategoryListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 产品详情
  async ProductInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/saas/v1/ProductInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 开通产品
  async UserProductApply(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserProductApply',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 浏览记录
  async UserBrowseProductMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/UserBrowseProductMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
