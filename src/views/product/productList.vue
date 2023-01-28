<template>
  <div class="gwin-manage-role">
    <el-row class="flex flex-only-center pad-20" justify="space-between">
      <div class="gwin-manage-role__title">我的产品</div>
    </el-row>
    <div class="gwin-manage-table-bg">
      <el-row justify="space-between">
        <el-col :span="20" :xs="10" :sm="15" :md="18" :lg="17" :xl="20">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="state.formData.productName" clearable placeholder="请输入产品名称" />
            </el-col>
            <el-col :span="7">
              <el-select v-model="state.formData.status" clearable placeholder="全部状态">
                <el-option v-for="item in state.stateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="state.formData.applySource" clearable placeholder="全部订单来源">
                <el-option v-for="item in state.applySource" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="5">
              <el-select v-model="state.formData.timeType" clearable placeholder="服务生效日期">
                <el-option v-for="item in state.timeType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="14">
              <el-date-picker
                v-model="state.formData.time"
                clearable
                end-placeholder="结束日期"
                range-separator=" - "
                start-placeholder="开始日期"
                type="daterange"
                @change="getProductList"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="5">
              <el-select v-model="state.formData.productUsage" clearable placeholder="开通类型">
                <el-option v-for="item in state.productUsage" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :xs="14" :sm="9" :md="6" :lg="5" :xl="4" style="text-align: right">
          <el-button size="medium" type="primary" @click="getProductList">查询</el-button>
          <el-button size="medium" @click="clearSelection">重置</el-button>
        </el-col>
      </el-row>
      <br />
      <el-table
        :data="state.tableData"
        :header-cell-style="{ background: '#FAFBFD', color: '#1A2234' }"
        style="width: 100%"
      >
        <el-table-column label="产品名称" prop="productName" />
        <el-table-column label="服务生效日期">
          <template #default="scope">
            <span v-if="scope.row.beginTime">{{ formatDate(scope.row.beginTime, 'YYYY-mm-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务截止日期">
          <template #default="scope">
            <span v-if="scope.row.endTime">{{ formatDate(scope.row.endTime, 'YYYY-mm-dd') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开通类型">
          <template #default="scope">
            <span v-if="scope.row.productUsage">{{ getText(scope.row.productUsage, 'productUsage') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单来源">
          <template #default="scope">
            <span v-if="scope.row.applySource">{{ getText(scope.row.applySource, 'applySource') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template #default="scope">
            <span v-if="scope.row.createAt">{{ formatDate(scope.row.createAt, 'YYYY-mm-dd HH:MM') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品状态">
          <template #default="scope">
            <span v-if="scope.row.status">{{ getText(scope.row.status, 'stateList') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="router.push('/product/productDetails?id=' + scope.row.productNo)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :current-page="state.pageParam.pageNum"
        :page-size="state.pageParam.pageSize"
        :total="state.pageParam.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import { useRouter, useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import api from '@/api/product'
import { RootObject, publicData } from './publicData'
import { formatDate } from '@/utils'

const router = useRouter()
const route = useRoute()
console.log(route)

const state: RootObject = reactive({
  // 分页参数
  pageParam: {
    count: 0,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    returnCount: true
  },
  // 搜索
  formData: {
    time: '',
    productName: '',
    status: '',
    applySource: '',
    timeType: 1,
    beginTime: '',
    endTime: '',
    productUsage: ''
  },
  // 返回数据
  tableData: [],
  ...publicData
})

onMounted(() => {
  getProductList()
})

// 重置
const clearSelection = () => {
  state.formData = {
    time: '',
    productName: '',
    status: '',
    applySource: '',
    timeType: 1,
    beginTime: '',
    endTime: '',
    productUsage: ''
  }
  getProductList()
}

// 文本显示
const getText = (value: number, num: string) => {
  if (!value) return
  const item = publicData[num].find((item: any) => item.value === value)
  return item?.label
}

// 获取产品列表
const getProductList = async () => {
  if (state.formData.time) {
    const time = state.formData.time
    state.formData.beginTime = formatDate(time[0], 'YYYY-mm-dd HH:MM:SS')
    state.formData.endTime = formatDate(time[1], 'YYYY-mm-dd HH:MM:SS')
  }
  const res = await api.UserProductActivedListInquiry({
    page: state.pageParam,
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId'),
    ...state.formData
  })
  if (res.status.success) {
    // tableData
    state.tableData = res.body.dataList

    // pageData
    state.pageParam.total = res.body.page.count
    state.pageParam.pageSize = res.body.page.pageSize
    state.pageParam.pageNum = res.body.page.pageNum
  }
}
/**
 * 分页
 */
const sizeChange = (val: number) => {
  state.pageParam.pageSize = val
  getProductList()
}

/**
 * 分页 当前页
 */
const currentChange = (val: number) => {
  state.pageParam.pageNum = val
  getProductList()
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('role') {
  min-height: calc(100%);
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  @include e('title') {
    color: #121212;
    font-size: 16px;
    font-weight: 500;
    &::before {
      content: '';
      width: 4px;
      height: 18px;
      margin-right: 6px;
      display: inline-block;
      vertical-align: text-bottom;
      background-color: #3c7dff;
    }
  }
}
@include b('table-bg') {
  width: 100%;
  padding: 0 20px;
}
</style>
