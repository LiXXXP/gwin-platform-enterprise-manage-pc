import { reactive } from 'vue'

// ts
export interface RootObject {
  pageParam: PageParam
  formData: FormData
  tableData: any[]
  stateList: StateList[]
  applySource: StateList[]
  addTimeType: StateList[]
  timeType: StateList[]
  productUsage: StateList[]
  statusList: StateList[]
}

export interface FormData {
  time: string
  productName: string
  status: string
  applySource: string
  timeType: number
  beginTime?: string
  endTime?: string
  productUsage: string
  reviewStatus: string
}

export interface PageParam {
  count: number
  pageNum: number
  pageSize: number
  total: number
  returnCount: boolean
}

interface StateList {
  label: string
  value: number
}

const publicData: Record<string, Val[]> = reactive({
  // 产品状态
  stateList: [
    {
      label: '试用中',
      value: 1
    },
    {
      label: '已购买',
      value: 2
    },
    {
      label: '已停用',
      value: 4
    }
  ],
  // 订单来源1
  applySource: [
    {
      label: '用户申请',
      value: 1
    },
    {
      label: '运营开通',
      value: 2
    }
  ],
  addTimeType: [
    {
      label: '创建时间',
      value: 1
    },
    {
      label: '更新时间',
      value: 2
    }
  ],
  timeType: [
    {
      label: '服务生效日期',
      value: 1
    },
    {
      label: '服务结束日期',
      value: 2
    }
  ],
  // 产品开通类型
  productUsage: [
    {
      label: '购买',
      value: 2
    },
    {
      label: '试用',
      value: 1
    },
    {
      label: '试用延期',
      value: 4
    }
  ],
  statusList: [
    {
      label: '待审核',
      value: 2
    },
    {
      label: '已通过',
      value: 1
    },
    {
      label: '已驳回',
      value: 4
    }
  ]
})

export { publicData }
