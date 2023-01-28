<template>
  <el-popover v-model:visible="state.visible" placement="bottom" :width="220" trigger="click">
    <template #reference>
      <div class="iconHolder" @click="handleInit">
        <svg-icon class-name="icon" icon-class="Icon-more"></svg-icon>
      </div>
    </template>
    <div v-if="state.isHandleShow" class="handle">
      <div class="title flex flex-between flex-only-center">
        <p style="width: 18px"></p>
        <p>更多菜单</p>
        <SvgIcon icon-class="close" class="close" @click="handleClose" />
      </div>
      <div class="item" @click="handleEditForm">编辑</div>
      <div
        v-if="
          props.tableRow.row.userId != state.userId &&
          props.tableRow.row.role != 'ADMIN' &&
          props.tableRow.row.role != 'admin'
        "
        class="item flex flex-between flex-only-center"
      >
        <p>是否停用账号</p>
        <el-switch
          v-model="state.switchValue"
          style="display: block"
          active-color="#409eff"
          inactive-color="#ccc"
          @change="handleSwitchChange"
        ></el-switch>
      </div>
      <div
        v-if="
          props.tableRow.row.userId != state.userId &&
          props.tableRow.row.role != 'ADMIN' &&
          props.tableRow.row.role != 'admin'
        "
        class="item del"
        @click="handleDeleteRow"
      >
        删除
      </div>
    </div>
    <div v-else class="confrim handle">
      <div class="title flex flex-between flex-only-center">
        <svg-icon class-name="icon" icon-class="icon-left" @click="goBank"></svg-icon>
        <p>{{ state.confrimBox.title }}</p>
        <svg-icon class-name="icon" icon-class="icon-delete2" @click="handleClose"></svg-icon>
      </div>
      <div class="content">
        <p>{{ state.confrimBox.content }}</p>
        <ul v-if="state.confrimBox.title === '停用账号'" class="info">
          <li>被停用的账号将无法访问该企业</li>
          <li>账号信息仍保留，方便工作交接</li>
          <li>支持账号恢复</li>
        </ul>
      </div>
      <el-button class="confrim-btn" type="danger" size="mini" @click="handleConfrim">确认</el-button>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { nextTick, reactive } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Cookies from 'js-cookie'

const props = defineProps({
  tableRow: {
    type: Object,
    default: () => ({})
  },
  handleShow: {
    type: Boolean,
    default: () => true
  }
})
const emit = defineEmits(['editForm', 'deleteRow', 'resetPassword', 'ceaseAccount'])

const state = reactive({
  switchValue: props.tableRow.row.status === '停用',
  isHandleShow: true,
  visible: false,
  confrimBox: {
    content: '',
    status: '',
    title: ''
  },
  userId: Cookies.get('userId')
})

/**
 * 初次点击操作菜单
 */
const handleInit = () => {
  state.visible = true
  state.isHandleShow = true
}

/**
 * 编辑按钮
 */
const handleEditForm = () => {
  state.visible = false
  emit('editForm', props.tableRow)
}

/**
 * 关闭操作菜单按钮
 */
const handleClose = () => {
  state.visible = false
}

/**
 * 返回按钮
 */
const goBank = () => {
  state.isHandleShow = true
}

/**
 * 删除按钮
 */
const handleDeleteRow = () => {
  state.isHandleShow = false
  state.confrimBox.title = '移除成员'
  state.confrimBox.content = `你确定把 「 ${props.tableRow.row.name} 」从企业中移除吗？`
  state.confrimBox.status = 'delete'
}

/**
 * 停用账号
 */
const handleSwitchChange = (val: boolean) => {
  nextTick(() => {
    state.isHandleShow = false
    state.confrimBox.status = 'discontinue'
  })
  if (val === false) {
    state.switchValue = true
    state.confrimBox.title = '启用账号'
    state.confrimBox.content = '你确定要启用当前账号吗？'
  } else {
    state.switchValue = false
    state.confrimBox.title = '停用账号'
    state.confrimBox.content = '你确定要停用当前账号吗？'
  }
}

/**
 * 确认按钮
 */
const handleConfrim = () => {
  state.visible = false
  // 移除账号
  if (state.confrimBox.status === 'delete') {
    emit('deleteRow', props.tableRow)
  }
  // 停用
  if (state.confrimBox.status === 'discontinue') {
    state.switchValue ? (state.switchValue = false) : (state.switchValue = true)
    emit('ceaseAccount', props.tableRow, state.switchValue)
    state.isHandleShow = true
  }
}
</script>

<style lang="scss" scoped>
.handle {
  .title {
    color: #333;
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
    &:hover {
      color: #409eff;
    }
    &.del:hover {
      color: #fc4949;
      background-color: rgba(252, 73, 73, 0.09);
    }
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
.iconHolder {
  width: 80px;
  margin: 0 auto;
}
</style>
