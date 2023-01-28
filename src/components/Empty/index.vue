<template>
  <div class="empty">
    <img v-if="props.status == 1" src="@/assets/img/default-page-No.png" alt="" />
    <p>{{ props.text }}</p>
  </div>
</template>

<script lang="ts" setup>
// status1 暂无 内容
const props = defineProps({
  status: {
    type: Number,
    default: 1
  },
  text: {
    type: String,
    default: '暂无数据'
  }
})
</script>

<style lang="scss">
.empty {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: #999;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
