<template>
  <el-dialog v-model="state.drawer.dialog" width="800px" :before-close="handleClose">
    <h3 class="flex flex-center">
      {{ state.drawer.title == '编辑成员' ? state.drawer.title : state.drawer.title + '成员详细信息' }}
    </h3>
    <br />
    <div class="demo-drawer__content">
      <el-form
        ref="proveForm"
        size="mini"
        label-position="top"
        :model="state.drawer"
        :rules="state.drawer.formList[0].list"
      >
        <el-form-item v-for="(item, index) in state.drawer.formList" :key="item.title" title="{title}" :name="index">
          <template #title>
            <span class="title-class">{{ item.title }}</span>
          </template>
          <el-row :gutter="20">
            <el-col v-for="(data, i) in item.list" :key="data.label" :span="12" :offset="0">
              <el-form-item
                :label="data.label"
                :label-width="state.formLabelWidth"
                :prop="`formList[${index}].list[${i}].value`"
                :rules="data.rules"
              >
                <label v-if="data.tips" class="tips-icon">
                  <el-tooltip effect="dark" :content="data.tips" placement="top">
                    <SvgIcon icon-class="mark" class="mark" />
                  </el-tooltip>
                </label>
                <!-- input 类型 -->
                <el-input
                  v-if="data.type === 'input'"
                  v-model="data.value"
                  size="small"
                  :type="data.inputType"
                  :oninput="data.inputType == 'number' ? 'if(value.length > 11) value=value.slice(0, 11)' : ''"
                  :disabled="
                    state.drawer.pattern === 'edit' && data.disabled === true
                      ? true
                      : state.drawer.pattern === 'edit'
                      ? false
                      : true
                  "
                  :show-password="data.password"
                  :placeholder="data.placeholder"
                  style="width: 90%; margin-bottom: 5px"
                ></el-input>
                <!-- 日期选择 类型 -->
                <el-date-picker
                  v-if="data.type === 'date'"
                  v-model="data.value"
                  size="small"
                  :type="data.type"
                  :disabled="
                    state.drawer.pattern === 'RowClick'
                      ? true
                      : state.drawer.pattern === 'edit' && data.disabled === true
                      ? true
                      : false
                  "
                  :placeholder="data.placeholder"
                  style="width: 90%; margin-bottom: 5px"
                ></el-date-picker>
                <!-- 多级选择 类型 -->
                <el-cascader
                  v-if="data.type === 'cascader'"
                  v-model="data.value"
                  size="small"
                  clearable
                  :options="data.options"
                  :disabled="
                    state.drawer.pattern === 'RowClick'
                      ? true
                      : state.drawer.pattern === 'edit' && data.disabled === true
                      ? true
                      : false
                  "
                  :placeholder="data.placeholder"
                  filterable
                  :props="{ multiple: state.drawer.multiple, checkStrictly: true }"
                  style="width: 90%; margin-bottom: 5px"
                ></el-cascader>
                <!-- 多选 -->
                <el-select
                  v-if="data.type === 'select'"
                  v-model="data.value"
                  size="small"
                  style="width: 90%; margin-bottom: 5px"
                  :multiple="data.multiple"
                  :placeholder="data.placeholder"
                  :disabled="state.drawer.pattern === 'edit' ? false : true"
                >
                  <el-option
                    v-for="item in data.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="form-btns">
          <div class="flex flex-end">
            <el-button size="mini" class="btn-font-normal" @click="resetForm">取消</el-button>
            <el-button size="mini" class="btn-font-normal" type="primary" @click="submitForm">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import api from '@/api/user'

import userData from './user'

const props = defineProps({
  drawer: {
    type: Object,
    default: () => ({})
  },
  userId: {
    type: String,
    default: () => ''
  }
})
const proveForm = ref(null)

const emit = defineEmits(['editHandleSubmitClick'])
const state = reactive({
  drawer: props.drawer,
  formLabelWidth: '90px',
  activeNames: [0, 1],
  show: true,
  id: props.userId,
  groupId: 0
})

const getData = async () => {
  const res = await api.SubjectUserInquiry({
    userId: props.userId
  })
  if (res.status.success) {
    state.groupId = res.body.groupId
    userData.edit.formList.forEach((item) => {
      for (const i of item.list) {
        const point = i.point
        i.value = res.body[point]
      }
    })
    userData.edit.formList[0].list[6].value = []
    res.body.roleList.forEach((element: any) => {
      userData.edit.formList[0].list[6].value.push(element.roleId)
    })
  }
}

/**
 * 关闭弹出层
 */
const handleClose = () => {
  state.drawer.dialog = false
}

/**
 * 提交按钮
 */
const submitForm = () => {
  proveForm.value.validate(async (valid: any) => {
    if (valid) {
      emit('editHandleSubmitClick', state.drawer, state.groupId)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

/**
 * 重置按钮
 */
const resetForm = () => {
  handleClose()
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.title-class {
  height: 24px;
  display: block;
  line-height: 24px;
  font-size: 14px;
  color: #515151;
  font-weight: 600;
  padding-left: 32px;
}
.demo-drawer__content {
  padding: 0 0 0 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.form-btns {
  margin: 0;
  width: 100%;
  padding: 20px 50px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  right: 0;
  bottom: 0;
}
.mark {
  cursor: help;
}
.tips-icon {
  position: absolute;
  top: 0;
  left: -20px;
}
:deep(.el-form-item__label) {
  padding-right: 22px;
}
</style>
