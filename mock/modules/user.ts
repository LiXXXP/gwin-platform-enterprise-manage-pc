import { MockMethod } from 'vite-plugin-mock'

const userMock: MockMethod[] = [
  // user user
  {
    url: '/cif/v1/SubjectProductInquiry1',
    method: 'post',
    response: {
      body: {
        beginTime: '2021-12-24T09:02:16.313Z',
        endTime: '2021-12-24T09:02:16.313Z',
        productName: 'string',
        productNo: 'string',
        productStatus: 0,
        productUsage: 0,
        subjectId: 0,
        subjectName: 'string'
      },
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  }
]

export default userMock
