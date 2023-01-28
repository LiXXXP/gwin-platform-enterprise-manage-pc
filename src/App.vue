<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue-demi'
defineComponent({
  zhCn
})
</script>

<style lang="scss" scoped>
// UI要求单独处理的element样式
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 !important;
}

::v-deep .el-table::before {
  height: 0 !important;
}
::v-deep .el-table__fixed-right::before {
  height: 0 !important;
}
::v-deep .el-dialog__header {
  padding: 0 !important;
}
</style>
