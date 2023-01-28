<template>
  <div class="user">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="title">成员</div>
      <el-button class="btn-font-normal" type="primary" size="mini" @click="addUrl">
        <svg-icon class-name="icon" icon-class="add"></svg-icon>
        添加成员
      </el-button>
    </el-row>
    <!-- 表格 -->
    <div class="table pad-20">
      <el-row>
        <el-col :span="8" :offset="0">
          <el-input v-model="data.searchName" clearable placeholder="请输入成员姓名"></el-input>
        </el-col>
        <el-button
type="primary" class="polf"
@click=";(data.pageParam.currentPage = 1), userListInquiry()"
          >搜索
        </el-button>
      </el-row>
      <br />
      <table-view :table-detail="data.tableDetail" @row-click="rowClick" @selection-change="selectionChange">
        <!-- 头像 -->
        <template #avatar="avatar">
          <div class="avatar">
            <span>{{ avatar.row.name ? avatar.row.name.substr(0, 1) : '' }}</span>
            {{ avatar.row.name }}
          </div>
        </template>
        <!-- 操作 -->
        <template #handle="handleSlot">
          <Handle
            :table-row="handleSlot.row"
            @edit-form="editForm"
            @delete-row="deleteRow"
            @cease-account="ceaseAccount"
          />
        </template>
      </table-view>
      <Pagination
        v-if="data.pageParam.total > 0"
        :current-page="data.pageParam.pageNum"
        :page-size="data.pageParam.pageSize"
        :total="data.pageParam.total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
      <Edit
        v-if="data.edit.dialog"
        :drawer="data.edit"
        :user-id="data.userId"
        @edit-handle-submit-click="editHandleSubmitClick"
      />
      <!-- 邀请链接 -->
      <el-dialog v-model="data.addUrlShow" width="40%">
        <div class="popverBg">
          <h3>添加成员</h3>
          <br />
          <div>
            <el-form label-position="top">
              <el-form-item label="链接权限">
                <el-select class="w-100" disabled placeholder="不需要审批，直接加入"></el-select>
              </el-form-item>
              <el-form-item v-model="data.shareUrl" label="链接地址">
                <el-input disabled maxlength="30" :placeholder="data.shareUrl" show-word-limit type="textarea" />
              </el-form-item>
              <span class="refresh" @click="generationUrl">刷新链接</span>
            </el-form>
            <el-button type="primary" class="w-100" @click="copyBtn">复制邀请链接</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userData from './user'
import Edit from './edit.vue'
import Handle from './handle.vue'
import { ElMessage } from 'element-plus'
import { reactive, onMounted } from 'vue'
import api from '@/api/user'
import TableView from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Cookies from 'js-cookie'
import userApi from '@/api/user'
import groupApi from '@/api/group'
import roleApi from '@/api/role'
import { parseTime } from '@/utils/index'
import config from '@/config'

const data = reactive({
  val: '',
  title: '查询表格',
  seeData: {},
  handleShow: true,
  add: userData.add, // 用户新增
  edit: userData.edit, // 用户编辑
  multipleSelection: [], // table 选择条目
  searchForm: userData.searchForm, // 头部搜索框内容
  batchEvents: userData.batchEvents, // 批量操作 table 的底部按钮
  tableDetail: userData.tableDetail, // table 传入数据
  seachOperation: userData.seachOperation,
  userId: '',
  tableListDom: {
    // table dom
    clearSelection: Function
  },
  pageParam: {
    // 分页参数
    count: 0,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    returnCount: true
  },
  userParam: {
    userName: '',
    mobile: '',
    title: '',
    email: '',
    account: '',
    password: '',
    roleIds: []
  },
  searchName: '',
  addUrlShow: false,
  shareUrl: '',
  editRow: {},
  departmentList: []
})

onMounted(() => {
  // 获取列表
  userListInquiry()
})

// 添加要求成员
const addUrl = () => {
  data.addUrlShow = true
  generationUrl()
}

// 生成链接
const generationUrl = async () => {
  const res = await api.SubjectUserInvitationLinkGeneration({
    userId: Cookies.get('userId'),
    subjectId: Cookies.get('entityId')
  })
  if (res.status.success) {
    data.shareUrl = document.location.protocol + config.GWIN_URL_ACCOUNT_INVITE + res.body.inviteUrl
  }
}

const copyToClipboard = (textToCopy: any) => {
  data.addUrlShow = false
  ElMessage.success('复制成功')
  // navigator clipboard 需要https等安全上下文
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    return navigator.clipboard.writeText(textToCopy)
  } else {
    // 创建text area
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? res() : rej()
      textArea.remove()
    })
  }
}

// 复制链接
const copyBtn = () => {
  copyToClipboard(data.shareUrl)
}

/**
 * 用户列表查询
 */
const userListInquiry = async () => {
  const res = await api.SubjectUserListInquiry({
    page: data.pageParam,
    name: data.searchName,
    subjectId: Cookies.get('entityId')
  })
  if (res.status.success) {
    res.body.dataList.forEach((item: any) => {
      switch (item.status) {
        case 1:
          item.status = '正常'
          break
        case 2:
          item.status = '待审核'
          break
        case 4:
          item.status = '停用'
          break
        case 8:
          item.status = '删除'
          break
        default:
          item.status = '注销'
          break
      }
    })

    // tableData
    data.tableDetail.dataList = userData.tableDetail.dataList = res.body.dataList

    // pageData
    data.pageParam.total = res.body.page.count
    data.pageParam.pageSize = res.body.page.pageSize
    data.pageParam.pageNum = res.body.page.pageNum
  }
}
/**
 * table 多选
 */
const selectionChange = (val: [], tableListDom: any) => {
  data.multipleSelection = val
  data.tableListDom = tableListDom
}

/**
 * 停用 / 启用 账号
 */
const ceaseAccount = (row: any, statu: string) => {
  // 通过 id 请求接口
  updataState(row.row.userId, statu)
}

const updataState = async (id: any, statu: any) => {
  const res = await api.SubjectUserStatusMaintenance({
    userId: id,
    status: statu ? 4 : 1
  })
  if (res.status.success) {
    ElMessage({
      message: statu ? '停用成功' : '启用成功',
      type: 'success'
    })
    userListInquiry()
  }
}

/**
 * 删除一行数据  移除成员
 */
const deleteRow = (row: any) => {
  // 删除的数据
  deleteUser(row, row.row.userId)
}

const deleteUser = async (row: any, id: any) => {
  const res = await api.SubjectUserDeleting({
    userId: id
  })
  if (res.status.success) {
    // 调用删除的接口
    data.tableDetail.dataList.splice(row.$index, 1)
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
  }
}
/**
 * 点击table每一行 打开编辑弹出层
 */
const rowClick = (row: any) => {
  editItem(row)
  data.edit.pattern = 'RowClick'
  data.edit.title = row.name
  data.userId = row.userId
  data.editRow = row.row
}

/**
 * 操作区 编辑按钮
 */
const editForm = (row: any) => {
  editItem(row)
  data.edit.title = '编辑成员'
  data.userId = row.row.userId
  data.editRow = row.row
}

/**
 * 编辑
 */
const editItem = (row: any) => {
  data.edit.dialog = true
  data.edit.pattern = 'edit'
  getDepartmentList()
  getRoleList()
}

// 获取部门列表
const getDepartmentList = async () => {
  const res = await groupApi.SubjectGroupListInquiry({
    treeParentId: 0
  })
  if (res.status.success) {
    userData.edit.formList[0].list[4].options = res.body.dataList
  }
}

// 获取角色列表
const getRoleList = async () => {
  const res = await roleApi.SubjectRoleListInquiry({
    page: {
      count: 0,
      orderBy: '',
      pageNum: 1,
      pageSize: 999,
      returnCount: true
    }
  })
  if (res.status.success) {
    const option: object[] = []
    res.body.dataList.forEach((item: any) => {
      const list = {
        label: item.roleName,
        value: item.roleId
      }
      option.push(list)
    })
    userData.edit.formList[0].list[6].options = option
  }
}

/**
 * 编辑按钮 提交编辑表单内容
 */
const editHandleSubmitClick = (val: any) => {
  for (const item of val.formList) {
    for (const i of item.list) {
      if (i.rules[0].required) {
        if (i.value === '') {
          ElMessage({
            message: i.placeholder,
            type: 'error'
          })
          return
        }
      }
    }
  }
  data.edit.dialog = false
  const obj: any = {}
  val.formList.forEach((item: any) => {
    for (const i of item.list) {
      const point = i.point
      obj[point] = i.value
    }
  })

  const params = {
    userSubjectId: data.editRow.id,
    ...obj
  }
  if (obj.birthday) params.birthday = parseTime(obj.birthday)
  if (typeof obj.groupId !== 'string') {
    if (obj.groupId) {
      params.groupId = obj.groupId[obj.groupId.length - 1]
    } else {
      params.groupId = 0
    }
  }
  params.roleIds = obj.roleId
  delete params.roleId

  // 编辑API
  updataEditData(params)
}

// 编辑api
const updataEditData = (obj: any) => {
  userApi
    .SubjectUserMaintenance({
      ...obj
    })
    .then((res: any) => {
      if (res.status.success) {
        ElMessage({
          message: '编辑成功',
          type: 'success'
        })
        userListInquiry()
      }
    })
}
/**
 * 分页
 */
const sizeChange = (val: number) => {
  data.pageParam.pageSize = val
  userListInquiry()
}

/**
 * 分页 当前页
 */
const currentChange = (val: number) => {
  data.pageParam.pageNum = val
  userListInquiry()
}
</script>

<style lang="scss" scoped>
.user {
  min-height: calc(100%);
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  .avatar {
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: #3c7dff;
      color: #fff;
      border-radius: 50%;
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      box-sizing: border-box;
    }
  }
  .popverBg {
    position: relative;
    h3 {
      display: inline-block;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .refresh {
      position: absolute;
      right: 0;
      top: 152px;
      font-size: 14px;
      font-weight: 400;
      color: #3c7dff;
      width: 100px;
      cursor: pointer;
      text-align: right;
    }
  }
  .polf {
    position: relative;
    left: -4px;
    border-radius: 0 5px 5px 0;
  }
  .btn-font-normal {
    width: 124px;
    height: 40px;
    background: #3c7dff;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }
  .title {
    color: var(--gwin-color);
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
  .table {
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
  }
  .refresh {
    width: 22px;
    height: 22px;
    cursor: pointer;
    margin-left: 20px;
  }
  .setting {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
