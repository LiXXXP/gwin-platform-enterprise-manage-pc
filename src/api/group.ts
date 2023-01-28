import { Request, Response } from '@gwin/networking'

export class Api {
  // 企业部门列表
  async SubjectGroupListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectGroupListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 新增部门
  async SubjectGroupAddition(params: any): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectGroupAddition',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 编辑部门
  async SubjectGroupMaintenance(params: any): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectGroupMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 删除部门
  async SubjectGroupDeleting(params: any): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectGroupDeleting',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
