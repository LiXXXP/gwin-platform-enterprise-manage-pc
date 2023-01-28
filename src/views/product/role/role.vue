<template>
  <div class="role">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="title">产品权限</div>
      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-button class="btn-font-normal" :disabled="!data.product" type="primary" size="mini">
            <svg-icon class-name="icon" icon-class="add"></svg-icon>
            添加角色
          </el-button>
        </template>
        <div class="popverBg">
          <h3>添加角色</h3>
          <div>
            <el-form label-position="top">
              <el-form-item label="角色名称">
                <el-input v-model="data.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" class="w-100" @click="createNameBtn">创建并配置</el-button>
          </div>
        </div>
      </el-popover>
    </el-row>
    <div class="roleList">
      <el-row>
        <el-col :span="10">
          <el-select v-model="data.product" style="width: 200px" placeholder="无开通的项目应用" @change="productChange">
            <el-option
              v-for="item in data.productList"
              :key="item.productNo"
              :label="item.productName"
              :value="item.productNo"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br />
      <el-table :data="data.tableData.dataList" style="width: 100%" @row-click="rowBtn">
        <el-table-column prop="roleName" />
        <el-table-column align="center" fixed="right" width="150">
          <template #default="scope">{{ scope.row.category === 'system' ? '系统默认角色' : '自定义' }}</template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="100">
          <template #default="scope">
            <Popover :row="scope.row" :role-index="2" @handle-confrim="handleConfrim" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/role'
import productApi from '@/api/product'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
import Popover from './components/popover.vue'

const router = useRouter()

const data = reactive({
  product: '',
  productList: <any>[],
  tableData: <any>{},
  switchValue: 'off',
  isHandleShow: true,
  visible: true,
  confrimBox: {
    content: '',
    status: '',
    title: ''
  },
  roleName: ''
})

onMounted(() => {
  // 产品列表
  getProductList()
})

// 点击当前行
const rowBtn = (row: any) => {
  router.push(
    '/product/jurisdiction?roleId=' +
      row.roleId +
      '&roleName=' +
      row.roleName +
      '&productNo=' +
      data.product +
      '&category=' +
      row.category
  )
}

// 选择项目
const productChange = () => {
  getList()
}

// 创建角色
const createNameBtn = async () => {
  if (data.roleName === '' || data.roleName.length < 3 || data.roleName.length > 15) {
    ElMessage.error('请输入正确角色名称3-15个字')
    return
  }
  const res = await api.SubjectRoleAddition({
    roleName: data.roleName,
    roleType: 'PRODUCT',
    productNo: data.product
  })
  if (res.status.success) {
    ElMessage.success('创建成功')
    router.push(
      '/product/jurisdiction?roleId=' + res.body.roleId + '&roleName=' + data.roleName + '&productNo=' + data.product
    )
    getList()
    data.roleName = ''
  }
}

// 企业移除
const handleConfrim = async (row: any) => {
  const res = await api.SubjectRoleDeleting({
    roleId: row.roleId
  })
  if (res.status.success) {
    getList()
  }
}

// 获取产品列表
const getProductList = async () => {
  const res = await productApi.UserProductActivedListInquiry({
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId')
  })
  if (res.status.success) {
    data.productList = res.body.dataList
    if (res.body.dataList.length > 0) {
      data.product = res.body.dataList[0].productNo
      // 获取列表
      getList()
    }
  }
}

// 获取角色列表
const getList = async () => {
  const res = await api.SubjectProductRoleListInquiry({
    page: {
      count: 0,
      orderBy: '',
      pageNum: 1,
      pageSize: 999,
      returnCount: false
    },
    roleName: data.roleName,
    productNo: data.product
  })
  if (res.status.success) {
    data.tableData = res.body
  }
}
</script>

<style scoped lang="scss">
:deep(.el-table thead) {
  display: none !important;
}
:deep(svg) {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.handle {
  .title {
    color: #333;
    font-weight: 600;
    text-align: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    .left {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .close {
      width: 18px;
      cursor: pointer;
    }
  }
  .item {
    padding: 10px;
    cursor: pointer;
    text-align: center;
    &:hover {
      color: #409eff;
    }
    &.del:hover {
      color: #fc4949;
      background-color: rgba(252, 73, 73, 0.09);
    }
  }
}
.search {
  line-height: 40px;
  color: #999999;
  .rtt {
    position: relative;
  }
  padding: 20px;

  .btn {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 5px 5px 0;
  }
}
.confrim {
  .content {
    color: #333;
    padding-top: 10px;
    .info {
      color: #666;
      font-size: 12px;
      padding-left: 8px;
      list-style: lower-alpha inside;
    }
  }
  .confrim-btn {
    width: 100%;
    margin-top: 10px;
  }
}
.popverBg {
  h3 {
    display: inline-block;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
  }
}

.role {
  min-height: calc(100%);
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  .roleList {
    border-top: 1px solid #f5f5f5;
    padding: 20px;
  }
  .polf {
    position: relative;
    left: -4px;
  }
  .btn-font-normal {
    width: 124px;
    height: 40px;
    background: #3c7dff;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    position: absolute;
    right: 20px;
  }
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
