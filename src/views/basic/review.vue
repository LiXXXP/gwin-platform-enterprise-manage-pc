<template>
  <div class="review">
    <div class="title">认证信息</div>
    <br />
    <!-- status 1审核已通过 2待审核 4驳回 -->
    <div v-if="props.proveStatus" class="reviewStatus">
      <!-- 未认证 -->
      <img v-if="props.proveStatus.status == 0" src="../../assets/img/Icon-unauthorized.png" />
      <i v-if="props.proveStatus.status == 0">您还尚未进行实名认证</i>
      <div v-if="props.proveStatus.status == 0" @click="toProve('0')">去认证</div>
      <!-- 审核中 -->
      <img v-if="props.proveStatus.status == 2" src="../../assets/img/Icon-review.png" />
      <i v-if="props.proveStatus.status == 2">您的认证正在审核中</i>
      <span v-if="props.proveStatus.status == 2">
        实名认证信息将于1-3个工作日内审核完成，请耐心等待审核结果，审核成功，即可完成认证
        <br />如果在审核过程中发现问题，需要重新实名认证
      </span>
      <!-- 被驳回 -->
      <img v-if="props.proveStatus.status == 4" src="../../assets/img/Icon-rejected.png" />
      <i v-if="props.proveStatus.status == 4">您的认证被驳回</i>
      <span v-if="props.proveStatus.status == 4"
        >很抱歉，您的实名认证信息被驳回，驳回原因是：（ {{ props.proveStatus.memo }} ），请修改后再次提交即可!</span
      >
      <div v-if="props.proveStatus.status == 4" @click="toProve('4')">再次提交认证</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['toProve'])

const props = defineProps({
  proveStatus: {
    type: Object,
    default: () => ({
      status: 0
    })
  }
})

// 去认证
const toProve = (index: any) => {
  emit('toProve', index)
}
</script>

<style lang="scss" scoped>
.review {
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 20px;
  height: calc(100vh - 100px);

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
  .reviewStatus {
    width: 100%;
    min-height: calc(100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    img {
      width: 68px;
      height: 68px;
      display: inline-block;
      margin-bottom: 20px;
    }
    i {
      font-size: 20px;
      font-weight: 500;
      color: #1d2129;
      font-style: normal;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #6e6e6e;
      max-width: 600px;
      text-align: center;
    }
    div {
      margin-top: 20px;
      width: 132px;
      height: 38px;
      background: #3c7dff;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
