<template>
  <div class="index">
    <div class="title">联系人管理</div>
    <br />
    <div class="pad-20">
      <el-table :data="data.tableData">
        <el-table-column prop="date" label="姓名" />
        <el-table-column prop="name" label="手机号" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>
  </div>
  <!-- 测试用 -->
  <!-- <ImgUpload :images="data.aa" fileType="pdf" type="text" :limit="3" @onUploadSuccess="bannerImageUploadSuccess" /> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// import ImgUpload from '@/components/ImgUpload/index.vue'

const data = reactive({
  tableData: [],
  aa: [
    {
      name: '12',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail'
    }
    // 'https://cdgwin-dev.cn-bj.ufileos.com/gwin-platform/gwin-cloud/licenseUri1638862247000.jpeg',
    // 'https://cdgwin-dev.cn-bj.ufileos.com/gwin-platform/gwin-cloud/licenseUri1638862401000.jpeg'
  ]
})

// const bannerImageUploadSuccess = (img: any) => {
//   console.log('拿到结果', img)
// }
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
