<template>
  <div class="detailBg">
    <div class="title">认证信息</div>
    <br />
    <div v-if="props.proveStatus" class="detail">
      <el-row>
        <el-col :span="8" :offset="0">
          组织类型：
          <span>企业</span>
        </el-col>
        <el-col :span="8" :offset="0">
          企业名称：
          <span>{{ props.proveStatus.corporateName }}</span>
        </el-col>
        <el-col :span="8" :offset="0">
          认证状态：
          <span>已认证</span>
        </el-col>
        <el-col :span="8" :offset="0">
          姓名：
          <span>{{ props.proveStatus.name }}</span>
        </el-col>
        <el-col :span="8" :offset="0">
          联系电话：
          <span>{{ props.proveStatus.contactPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</span>
        </el-col>
        <el-col :span="8" :offset="0">
          电子邮箱：
          <span>{{ props.proveStatus.contactEmail }}</span>
        </el-col>
      </el-row>
    </div>
    <br />
    <el-button type="primary" @click="proveChange">变更认证信息</el-button>
  </div>
  <div class="record">
    <div class="title">变更记录</div>
    <div class="pad-20">
      <el-table :data="data.recordList.dataList">
        <el-table-column prop="updateAt" label="变更类型">
          <template #default="scope">企业</template>
        </el-table-column>
        <el-table-column prop="createAt" label="发起时间">
          <template #default="scope">{{ timeConversion(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column prop="status" label="变更状态">
          <template #default="scope"
            >{{ scope.row.status == 1 ? '通过' : scope.row.status == 4 ? '驳回' : '待审核' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import basicApi from '@/api/basic'
import Cookies from 'js-cookie'
import { formatDate } from '@/utils/index'

const emit = defineEmits(['proveChange'])

const props = defineProps({
  proveStatus: {
    type: Object,
    default: () => ({})
  }
})

const data = reactive({
  recordList: <any>{}
})

onMounted(() => {
  // 获取变更记录
  getRecordList()
})

const timeConversion = (time: any) => {
  return formatDate(new Date(time), 'YYYY-mm-dd HH:MM')
}

// 变更记录
const getRecordList = async () => {
  const res = await basicApi.SubjectCertificationChangeListInquiry({
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId'),
    page: {
      orderBy: '',
      pageNum: 1,
      pageSize: 99999,
      returnCount: true
    }
  })
  if (res.status.success) {
    data.recordList = res.body
  }
}

// 变更
const proveChange = () => {
  emit('proveChange', '4')
}
</script>

<style lang="scss" scoped>
.record {
  margin-top: 20px;
}
.detailBg,
.record {
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 20px;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #121212;
    border-left: 4px solid #3c7dff;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .detail {
    background: rgba(60, 125, 255, 0.04);
    padding: 20px;
    line-height: 30px;
  }
}
</style>
