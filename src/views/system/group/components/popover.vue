<!--
 * @Author: Jin Biao
 * @Date: 2021-11-26 16:26:12
 * @LastEditTime: 2022-01-10 16:09:22
 * @Description:  弹窗
-->
<template>
  <el-popover ref="managerRef" v-model:visible="state.delShow" placement="left" :width="300" trigger="click">
    <template #reference>
      <div>
        <slot name="tapTitle"></slot>
      </div>
    </template>
    <div class="popverBg">
      <div>
        <slot name="popverBgs"></slot>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'

const managerRef: any = ref(null)

const props = defineProps({
  emitPopover: {
    type: Boolean,
    default: () => false,
    required: false
  },
  closeShow: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})

watch(
  () => [props.emitPopover, props.id],
  () => {
    console.log(props.emitPopover, 111)
    console.log(props.id, '222')
    // managerRef.value.show()
  }
)

const state = reactive({
  delShow: props.closeShow
})
</script>

<style lang="scss" scoped></style>
