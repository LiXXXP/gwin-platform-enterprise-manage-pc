import { Request, Response } from '@gwin/networking'

export class Api {
  // 成员列表
  async SubjectUserListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectUserListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 邀请成员链接
  async SubjectUserInvitationLinkGeneration(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectUserInvitationLinkGeneration',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 企业成员查询
  async SubjectUserInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectUserInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 停用账号
  async SubjectUserStatusMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectUserStatusMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 移除成员
  async SubjectUserDeleting(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectUserDeleting',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 编辑成员
  async SubjectUserMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/cif/v1/SubjectUserMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
