<template>
  <div class="gwin-manage-role">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="gwin-manage-role__title">我的产品 / 详情</div>
    </el-row>
    <el-row justify="space-between" class="flex flex-only-center gwin-manage-role__titleText">
      <div>{{ state.detailData.productName }}</div>
    </el-row>
    <div class="gwin-manage-table-bg">
      <div class="gwin-manage-title-text">产品开通信息</div>
      <div class="gwin-manage-detail">
        <el-row>
          <el-col :span="8"
            >产品状态：<span>{{ getText(state.detailData.productStatus, 'stateList') }}</span></el-col
          >
          <el-col :span="8"
            >开通类型：<span>{{ getText(state.detailData.productUsage, 'productUsage') }}</span></el-col
          >
        </el-row>
        <br />
        <el-row>
          <el-col :span="8"
            >生效日期：<span>{{ formatDate(state.detailData.beginTime, 'YYYY-mm-dd') }}</span></el-col
          >
          <el-col :span="8"
            >截止日期：<span>{{ formatDate(state.detailData.endTime, 'YYYY-mm-dd') }}</span></el-col
          >
        </el-row>
      </div>
      <div class="gwin-manage-title-text">产品开通日志</div>
      <el-table
        :data="state.tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#FAFBFD', color: '#1A2234' }"
      >
        <el-table-column prop="createAt" label="操作时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.createAt, 'YYYY-mm-dd HH:MM') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="applySource" label="订单来源">
          <template #default="scope">
            <span>{{ getText(scope.row.applySource, 'applySource') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productUsage" label="开通类型">
          <template #default="scope">
            <span>{{ getText(scope.row.productUsage, 'productUsage') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="产品状态">
          <template #default="scope">
            <span>{{ getText(scope.row.status, 'stateList') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="变更后服务期限日期">
          <template #default="scope">
            <span>{{ formatDate(scope.row.beginTime, 'YYYY-mm-dd') }}</span>
            -
            <span>{{ formatDate(scope.row.endTime, 'YYYY-mm-dd') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :current-page="state.pageParam.pageNum"
        :page-size="state.pageParam.pageSize"
        :total="state.pageParam.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
    <br />
    <div class="flex flex-center">
      <el-button type="primary" size="medium" @click="router.push('/product/productList')">返回</el-button>
    </div>
    <br />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import Cookies from 'js-cookie'
import api from '@/api/product'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils/index'
import { publicData } from './publicData'

const route = useRoute()
const router = useRouter()

interface RootObject {
  detailData: DetailData
  pageParam: PageParam
  tableData: any[]
}

interface PageParam {
  count: number
  pageNum: number
  pageSize: number
  total: number
  returnCount: boolean
}

interface DetailData {
  productStatus: number
  productName: string
  productUsage: number
  beginTime: number
  endTime: number
}

const state: RootObject = reactive({
  detailData: <DetailData>{},
  pageParam: {
    // 分页参数
    count: 0,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    returnCount: true
  },
  tableData: []
})

onMounted(() => {
  // 获取详情
  getDetail()
  // 获取列表
  getProductList()
})

// 文本显示
const getText = (value: number, num: string) => {
  if (!value) return
  const item = publicData[num].find((item: any) => item.value == value)
  return item?.label
}

// 获取详情信息
const getDetail = async () => {
  const res = await api.SubjectProductInquiry({
    subjectId: Cookies.get('entityId'),
    productNo: route.query.id
  })
  if (res.status.success) {
    state.detailData = res.body
  }
}

// 获取产品列表
const getProductList = async () => {
  const res = await api.SubjectProductLogListInquiry({
    page: state.pageParam,
    productNo: route.query.id,
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId')
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

<style scoped lang="scss">
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
  @include e('titleText') {
    padding: 10px 0 10px 18px;
    font-size: 24px;
    position: relative;
    top: -5px;
  }
}
@include b('detail') {
  padding: 20px;
  background: #f9faff;
  color: #999999;
  font-size: 14px;
  span {
    color: #1a2234;
  }
}
@include b('title-text') {
  font-size: 14px;
  font-weight: 500;
  color: #1a2234;
  padding: 10px 0;
  display: flex;
  align-items: center;
  &::before {
    margin-right: 16px;
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    background-color: #3c7dff;
  }
}
@include b('table-bg') {
  width: 100%;
  padding: 0 20px;
}
</style>
