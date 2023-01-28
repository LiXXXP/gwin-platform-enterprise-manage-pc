<template>
  <div class="opened flex flex-column flex-only-center flex-center">
    <div>
      <div class="flex">
        <div class="titleImg">
          <img v-if="data.detailData.coverUri" :src="data.detailData.coverUri" alt />
          <span v-else>{{ data.detailData.productName ? data.detailData.productName.substr(0, 1) : '' }}</span>
        </div>
        <div>
          <h2>{{ data.detailData.productName }}</h2>
          <span>{{ data.detailData.content }}</span>
          <div
            v-if="route.query.type != 'open'"
            class="flex flex-center flex-only-center"
            @click="data.openShow = true"
          >
            申请开通
          </div>
        </div>
      </div>
      <div>{{ data.detailData.memo }}</div>
    </div>
  </div>
  <!-- 开通 -->
  <el-dialog v-model="data.openShow" width="30%">
    <el-row justify="center">
      <el-col :span="24" class="flex flex-center">
        <h3>确定要开通 "{{ data.detailData.productName }}" 服务吗？</h3>
      </el-col>
    </el-row>
    <br />
    <br />
    <el-row justify="center" :gutter="20">
      <el-col :span="12" class="flex flex-center" style="display: flex">
        <el-button style="width: 165px; height: 44px" @click="data.openShow = false">取消</el-button>
      </el-col>
      <el-col :span="12" class="flex flex-center" style="display: flex">
        <el-button type="primary" style="width: 165px; height: 44px" @click="openBtn">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/application'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils/index'

const route = useRoute()
const router = useRouter()

const data = reactive({
  detailData: <any>{},
  openShow: false
})

onMounted(() => {
  getDetail()
})

// 开通
const openBtn = async () => {
  const res = await api.UserProductApply({
    beginTime: formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS'),
    endTime: '2099-12-31 23:59:59',
    productName: data.detailData.productName,
    productNo: data.detailData.productNo,
    productUsage: 1,
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId')
  })
  if (res.status.success) {
    data.openShow = false
    ElMessage.success('开通成功')
    router.go(-1)
  }
}

// 获取详情
const getDetail = async () => {
  const res = await api.ProductInquiry({
    productNo: route.query.id
  })
  if (res.status.success) {
    data.detailData = res.body
  }
  // 添加浏览
  await api.UserBrowseProductMaintenance({
    productNo: route.query.id,
    action: 'A',
    userId: Cookies.get('userId')
  })
}
</script>

<style lang="scss" scoped>
.opened {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: calc(100%);
  > div {
    > div:first-child {
      max-width: 700px;
      .titleImg {
        width: 140px;
        height: 139px;
        margin-right: 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: #fff;
          font-size: 40px;
          background: #3c7dff;
        }
        img {
          width: 140px;
          height: 139px;
          border-radius: 10px;
        }
      }

      > div {
        line-height: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
          font-size: 16px;
          font-weight: 400;
          color: #6e6e6e;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*autoprefixer: on */
        }
        div {
          width: 104px;
          height: 38px;
          background: #3c7dff;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    > div:last-child {
      margin-top: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #6e6e6e;
      max-width: 700px;
      line-height: 24px;
    }
  }
}
</style>
