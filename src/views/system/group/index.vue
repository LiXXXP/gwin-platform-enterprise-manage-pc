<template>
  <div class="group">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="title">组织架构</div>
      <el-popover ref="popoverRef" v-model:visible="state.addShow" placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-button
            class="btn-font-normal"
            type="primary"
            size="mini"
            @click=";(state.addName = ''), (state.manager = '')"
          >
            <svg-icon class-name="icon" icon-class="add"></svg-icon>创建部门
          </el-button>
        </template>
        <div class="popverBg">
          <h3>新建一级部门</h3>
          <div>
            <el-form label-position="top">
              <el-form-item label="一级部门名称">
                <el-input v-model="state.addName" placeholder="请输入部门名称"></el-input>
              </el-form-item>
              <el-form-item label="上级部门">
                <el-input :placeholder="state.enterprise.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="设置部门负责人">
                <el-select
                  v-model="state.manager"
                  :popper-append-to-body="false"
                  filterable
                  clearable
                  style="width: 100%"
                  placeholder="请添加部门负责人"
                  @visible-change="visChange"
                >
                  <el-option v-for="item in state.userData" :key="item.userId" :label="item.name" :value="item.userId">
                    <div class="avatar">
                      <span>{{ item.name ? item.name.substr(0, 1) : '' }}</span>
                      {{ item.name }}
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button type="primary" class="w-100" @click="addDepartment">确认</el-button>
          </div>
        </div>
      </el-popover>
    </el-row>
    <!-- 表格 -->
    <div class="table pad-20">
      <el-row>
        <el-col :span="8">
          <el-input v-model="state.search" clearable placeholder="请输入部门名称" @change="searchChange"></el-input>
        </el-col>
        <el-button type="primary" class="polf">搜索</el-button>
      </el-row>
      <br />
      <br />
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <h4 class="team"><img src="@/assets/img/Icon-team.png" />{{ state.enterprise.name }}</h4>
        </el-col>
        <br />
        <br />
        <el-col :span="24" :offset="0">
          <el-tree
            ref="tree"
            :data="state.treeData"
            auto-expand-parent
            :props="state.defaultProps"
            :filter-node-method="filterNode"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleBucketClick"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ data.label }}</span>
                <span class="flex">
                  <el-popover ref="managerRef" placement="left" :width="300" trigger="click">
                    <template #reference>
                      <a @click="edit(node, data)">
                        <svg-icon class-name="icon" icon-class="Icon-editor-hover"></svg-icon>
                      </a>
                    </template>
                    <div class="popverBg">
                      <h3>编辑部门</h3>
                      <div>
                        <el-form label-position="top">
                          <el-form-item label="部门名称">
                            <el-input v-model="state.addName" placeholder="请输入部门名称"></el-input>
                          </el-form-item>
                          <el-form-item label="上级部门">
                            <el-input :placeholder="state.superior || state.enterprise.name" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="设置部门负责人">
                            <el-select
                              v-model="state.manager"
                              clearable
                              :popper-append-to-body="false"
                              filterable
                              style="width: 100%"
                              placeholder="请添加部门负责人"
                            >
                              <el-option
                                v-for="item in state.userData"
                                :key="item.userId"
                                :label="item.name"
                                :value="item.userId"
                              >
                                <div class="avatar">
                                  <span>{{ item.name ? item.name.substr(0, 1) : '' }}</span>
                                  {{ item.name }}
                                </div>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>
                        <el-button type="primary" class="w-100" @click="editBtn">确认</el-button>
                      </div>
                    </div>
                  </el-popover>
                  <el-popover ref="managerChildRef" placement="left" :width="300" trigger="click">
                    <template #reference>
                      <a @click="edit(node, data), (state.manager = '')">
                        <svg-icon class-name="icon" icon-class="Icon-add"></svg-icon>
                      </a>
                    </template>
                    <div class="popverBg">
                      <h3>新增子级部门</h3>
                      <div>
                        <el-form label-position="top">
                          <el-form-item label="子级部门名称">
                            <el-input v-model="state.addChildName" placeholder="请输入子级部门名称"></el-input>
                          </el-form-item>
                          <el-form-item label="上级部门">
                            <el-input :placeholder="state.addName" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="设置部门负责人">
                            <el-select
                              v-model="state.manager"
                              :popper-append-to-body="false"
                              clearable
                              filterable
                              style="width: 100%"
                              placeholder="请添加部门负责人"
                              @visible-change="managerChildChange"
                            >
                              <el-option
                                v-for="item in state.userData"
                                :key="item.userId"
                                :label="item.name"
                                :value="item.userId"
                              >
                                <div class="avatar">
                                  <span>{{ item.name ? item.name.substr(0, 1) : '' }}</span>
                                  {{ item.name }}
                                </div>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>
                        <el-button type="primary" class="w-100" @click="addItem()">确认</el-button>
                      </div>
                    </div>
                  </el-popover>
                  <popover :close-show="state.delShow">
                    <template #tapTitle>
                      <a @click="edit(node, data)">
                        <svg-icon class-name="icon" icon-class="Icon-delete"></svg-icon>
                      </a>
                    </template>
                    <template #popverBgs>
                      <div class="title">
                        <h3>移除部门</h3>
                        <svg-icon class-name="icon" icon-class="icon-delete2" @click="state.delShow = false"></svg-icon>
                      </div>
                      <div>
                        <br />
                        <br />
                        <p class="pad-20">
                          你确定把「
                          {{ state.editRow.label }} 」部门移除吗？如果部门下有子部门或者成员，部门将无法移除。
                        </p>
                        <br />
                        <br />
                        <el-button type="danger" class="w-100" @click="removeBtn">确认</el-button>
                      </div>
                    </template>
                  </popover>
                </span>
              </span>
            </template>
          </el-tree>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import api from '@/api/group'
import basicApi from '@/api/basic'
import userApi from '@/api/user'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
import popover from './components/popover.vue'

const tree: any = ref(null)
const popoverRef: any = ref(null)

const state = reactive({
  delShow: false,
  visible: false,
  manager: '',
  search: '',
  addName: '',
  addChildName: '',
  addShow: false,
  treeData: <any>[],
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  label: '',
  superior: '',
  editRow: <any>{},
  enterprise: <any>{},
  userData: <any>{},
  tabIndex: '',
  emitPopover: false
})

onMounted(() => {
  getList()
  getUserList()
})

const visChange = () => {
  popoverRef.value.show()
}

const managerChildChange = () => {
  state.emitPopover = !state.emitPopover
}

// 点击当前
const handleBucketClick = (val) => {
  state.tabIndex = val.value
}

// 编辑部门数据
const edit = (node: any, data: any) => {
  state.editRow = data
  state.manager = data.manager
  state.addName = data.label
  state.superior = node.parent.data.label
}

// 移除部门
const removeBtn = async () => {
  const res = await api.SubjectGroupDeleting({
    groupId: state.editRow.value
  })
  if (res.status.success) {
    ElMessage.success('移除成功')
    getList()
  }
}

// 获取成员
const getUserList = async () => {
  const res = await userApi.SubjectUserListInquiry({
    page: {
      pageNum: 1,
      pageSize: 9999,
      returnCount: true
    },
    subjectId: Cookies.get('entityId')
  })
  if (res.status.success) {
    state.userData = res.body.dataList
  }
}

// 编辑部门
const editBtn = async () => {
  if (state.addName === '' || state.addName.length > 20) {
    ElMessage.error('请输入部门名称,20个字符以内')
    return
  }
  const res = await api.SubjectGroupMaintenance({
    groupId: state.editRow.value,
    manager: state.manager,
    name: state.addName
  })
  if (res.status.success) {
    state.addName = ''
    ElMessage.success('编辑部门成功')
    getList()
  }
}

// 新增
const addDepartment = async () => {
  if (state.addName === '' || state.addName.length > 20) {
    ElMessage.error('请输入部门名称,20个字符以内')
    return
  }
  const res = await api.SubjectGroupAddition({
    name: state.addName,
    treeLevel: 0,
    manager: state.manager
  })
  if (res.status.success) {
    state.addName = ''
    state.addShow = false
    ElMessage.success('新增部门成功')
    getList()
  }
}

// 搜索词
const searchChange = (val: any) => {
  tree.value.filter(val)
}

// 搜索
const filterNode = (value: any, data: any) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}

// 创建二级部门
const addItem = async () => {
  if (state.addChildName === '') {
    ElMessage.error('请输入部门名称')
    return
  }
  const res = await api.SubjectGroupAddition({
    name: state.addChildName,
    treeLevel: state.editRow.treeLevel + 1,
    treeParentId: state.editRow.value,
    manager: state.manager
  })
  if (res.status.success) {
    state.addChildName = ''
    state.addName = ''
    ElMessage.success('新增部门成功')
    getList()
  }
}

// 获取列表
const getList = async () => {
  const res = await api.SubjectGroupListInquiry({
    treeParentId: 0
  })
  state.treeData = res.body.dataList

  // 获取团队信息
  const enterprise = await basicApi.SubjectBasicInfoInquiry({
    subjectId: Cookies.get('entityId'),
    userId: Cookies.get('userId')
  })
  state.enterprise = enterprise.body
}
</script>

<style lang="scss" scoped>
.popverBg {
  .title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    h3 {
      display: inline-block;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
    }
    svg {
      font-size: 20px;
    }
  }
}
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
.gSelect {
  position: reactive;
  select {
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    border: 1px solid #dcdfe6;
    width: 89% !important;
    border-radius: 3px;
    color: #606266;
  }
  .svgSel {
    position: absolute;
    right: 21px;
    top: 15px;
  }
}
.group {
  width: 100%;
  min-height: calc(100%);
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);

  .table {
    border-top: 1px solid #f5f5f5;
    .team {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 3px;
      }
    }
  }

  svg {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  :deep(.el-tree-node__content) {
    height: 45px !important;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    a {
      margin-right: 20px;
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
