<template>
  <div class="authentication">
    <!-- status 1审核已通过 2待审核 4驳回 -->
    <!-- 企业认证 -->
    <Prove
      v-if="data.proveShow"
      :status="data.status"
      :prove-status="data.proveStatus"
      @sub-prove="subProve"
      @cancel-submit="cancelSubmit"
    />
    <!-- 认证信息 -->
    <Information
      v-if="!data.proveShow && data.proveStatus.status == 1"
      :prove-status="data.proveStatus"
      @prove-change="toProve"
    />
    <!-- 审核状态 -->
    <Review
      v-if="
        !data.proveShow &&
        (data.proveStatus.status == 0 || data.proveStatus.status == 2 || data.proveStatus.status == 4)
      "
      :prove-status="data.proveStatus"
      @to-prove="toProve"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import basicApi from '@/api/basic'
import Cookies from 'js-cookie'
import { useRoute } from 'vue-router'

import Prove from './prove.vue'
import Information from './information.vue'
import Review from './review.vue'

const route = useRoute()

const data = reactive({
  proveStatus: <any>{},
  proveShow: false,
  status: ''
})

onMounted(async () => {
  // 查询认证
  await getProveStatus()

  if (route.query.type === '0' || route.query.type === '2') {
    toProve(0)
  }
})

// 取消认证
const cancelSubmit = () => {
  data.proveShow = false
}

// 去认证
const toProve = (status: any) => {
  data.proveShow = true
  data.status = status
}

// 提交认证
const subProve = () => {
  getProveStatus()
}

// 查询认证
const getProveStatus = async () => {
  const res = await basicApi.SubjectCertificationInquiry({
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId')
  })
  if (res.status.success) {
    data.proveShow = false
    if (res.body.requestJson) {
      data.proveStatus = res.body.requestJson
      data.proveStatus.status = res.body.status
      data.proveStatus.memo = res.body.memo
    } else {
      data.proveStatus = res.body
    }
  }
}
</script>
