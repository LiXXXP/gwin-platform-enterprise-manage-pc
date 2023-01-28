import { Request, Response } from '@gwin/networking'

export class Api {
  // 企业基本信息
  async SubjectBasicInfoInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectBasicInfoInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  //   企业信息  编辑
  async SubjectBasicInfoMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectBasicInfoMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })

    return await request.start()
  }

  // 企业认证
  async SubjectCertificationAddition(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectCertificationAddition',
      params: params,
      isLoading: false,
      isMessage: true
    })
    return await request.start()
  }

  // 企业变更认证
  async SubjectCertificationMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectCertificationMaintenance',
      params: params,
      isLoading: false,
      isMessage: true
    })
    return await request.start()
  }

  // 查询认证状态
  async SubjectCertificationInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectCertificationInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 查询变更记录
  async SubjectCertificationChangeListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectCertificationChangeListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 行业列表
  async IndustryCascadeListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/IndustryCascadeListInquiry',
      params: params,
      isLoading: false,
      isMessage: true
    })
    return await request.start()
  }

  // 城市列表
  async RegionInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/RegionInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 查询地区列表
  async RegionListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/RegionListInquiry',
      params: params,
      isLoading: false,
      isMessage: true
    })
    return await request.start()
  }

  // 解散企业
  async SubjectDissolutionMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectDissolutionMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
