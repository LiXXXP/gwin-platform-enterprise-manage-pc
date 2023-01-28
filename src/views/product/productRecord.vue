<template>
  <div class="gwin-manage-role">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="gwin-manage-role__title">产品开通记录 / 详情</div>
    </el-row>
    <div class="gwin-manage-role__state">
      <span v-if="state.detailData.reviewStatus === 1" class="gwin-manage-role__state--success">
        <svg-icon class-name="icon" icon-class="gwin-success"></svg-icon>已通过
      </span>
      <span v-if="state.detailData.reviewStatus === 2" class="gwin-manage-role__state--warning">
        <svg-icon class-name="icon" icon-class="gwin-warning"></svg-icon>待审核
      </span>
      <span v-if="state.detailData.reviewStatus === 4" class="gwin-manage-role__state--error">
        <svg-icon class-name="icon" icon-class="gwin-error"></svg-icon>已驳回
      </span>
    </div>
    <div class="gwin-manage-table-bg">
      <div class="gwin-manage-detail">
        <el-row>
          <el-col :span="8"
            >订单编号：<span>{{ state.detailData.applyId }}</span></el-col
          >
          <el-col :span="8"
            >订单来源：<span>{{ getText(state.detailData.applySource, 'applySource') }}</span></el-col
          >
        </el-row>
        <br />
        <el-row>
          <el-col :span="8"
            >订单创建：<span>{{ state.detailData.userName }}</span></el-col
          >
          <el-col :span="8"
            >创建时间：<span>{{ formatDate(state.detailData.createAt, 'YYYY-mm-dd HH:MM') }}</span></el-col
          >
        </el-row>
      </div>
      <div class="gwin-manage-title-text">订单信息</div>
      <div class="gwin-manage-detail">
        <el-row>
          <el-col :span="8"
            >开通类型：<span>{{ getText(state.detailData.productUsage, 'productUsage') }}</span></el-col
          >
        </el-row>
        <br />
        <el-row>
          <el-col :span="8"
            >产品名称：<span>{{ state.detailData.productName }}</span></el-col
          >
          <el-col :span="8"
            >购买时长：<span>{{ getTimeNum(state.detailData.beginTime, state.detailData.endTime) }}</span></el-col
          >
        </el-row>
      </div>
      <div class="gwin-manage-title-text">审核信息</div>
      <div class="gwin-manage-detail">
        <el-row>
          <el-col
            >审核状态：<span>{{ getText(state.detailData.reviewStatus, 'statusList') }}</span></el-col
          >
          <br /><br />
          <el-col
            >审核意见：<span>{{ state.detailData.reviewMemo || '无' }}</span></el-col
          >
          <br /><br />
          <el-col
            >审核时间：<span>{{
              state.detailData.reviewAt ? formatDate(state.detailData.reviewAt, 'YYYY-mm-dd HH:MM') : '--'
            }}</span></el-col
          >
        </el-row>
      </div>
    </div>
    <br />
    <div class="flex flex-center">
      <el-button type="primary" size="medium" @click="router.push('/product/productOpen')">返回</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Cookies from 'js-cookie'
import api from '@/api/product'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils'
import { publicData } from '@/views/product/publicData'

const route = useRoute()
const router = useRouter()

interface RootObject {
  detailData: any
}
const state: RootObject = reactive({
  detailData: {}
})

onMounted(() => {
  // 获取详情
  getDetail()
})

// 计算开始时间到结束时间 是几个月
const getTimeNum = (beginTime: number, endTime: number) => {
  if (!beginTime) return
  const begin = new Date(beginTime)
  const end = new Date(endTime)
  const year = end.getFullYear() - begin.getFullYear()
  const month = end.getMonth() - begin.getMonth()
  const day = end.getDate() - begin.getDate()
  if (year >= 1) {
    return year + '年'
  }
  if (month >= 1) {
    return month + '个月'
  }
  if (day >= 1) {
    return day + '天'
  }
}

// 文本显示
const getText = (value: any, num: string) => {
  if (!value) return
  const item = publicData[num].find((item: any) => item.value == value)
  return item.label
}

// 获取详情信息
const getDetail = async () => {
  const res = await api.SubjectProductApplyInquiry({
    subjectId: Cookies.get('entityId'),
    id: route.query.id
  })
  if (res.status.success) {
    state.detailData = res.body
  }
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
  @include e('state') {
    padding: 0 20px;
    display: flex;
    align-items: center;
    svg {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }
    @include m('success') {
      color: var(--gwin-color-success);
    }
    @include m('warning') {
      color: var(--gwin-color-warning);
    }
    @include m('error') {
      color: var(--gwin-color-error);
    }
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
