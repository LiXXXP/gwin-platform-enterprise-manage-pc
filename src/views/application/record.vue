<template>
  <div class="index">
    <div class="title">应用开通记录</div>
    <br />
    <div class="pad-20">
      <el-table :data="data.listData.dataList" :header-cell-style="{ background: '#F6F7FB' }">
        <el-table-column prop="productName" label="应用名称" />
        <el-table-column prop="createAt" label="日期" />
        <el-table-column label="开通状态">
          <template #default="scope">
            <span v-if="scope.row.status == 1">已开通</span>
            <span v-if="scope.row.status == 2">开通待审核</span>
            <span v-if="scope.row.status == 4">审核驳回</span>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <br />
      <el-row justify="end">
        <Pagination
          :current-page="data.pageParam.pageNum"
          :page-size="data.pageParam.pageSize"
          :total="data.pageParam.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import api from '@/api/application'
import Pagination from '@/components/Pagination/index.vue'
import Cookies from 'js-cookie'

const data = reactive({
  pageParam: {
    // 分页参数
    count: 0,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    returnCount: true
  },
  listData: {},
  currentPage: 1
})

onMounted(() => {
  getList()
})

// 列表
const getList = async () => {
  const res = await api.SubjectProductApplyListInquiry({
    page: data.pageParam,
    subjectId: Cookies.get('entityId')
  })
  if (res.status.success) {
    data.listData = res.body
    data.pageParam.total = res.body.page.count
  }
}

//  分页
const sizeChange = (val: number) => {
  data.pageParam.pageSize = val
  getList()
}

// 分页 当前页
const currentChange = (val: number) => {
  data.pageParam.pageNum = val
  getList()
}
</script>

<style lang="scss" scoped>
.index {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  .title {
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
</style>
