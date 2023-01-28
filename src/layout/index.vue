<template>
  <div style="height: 100%">
    <Header class="app-header" />
    <div class="app-main">
      <Sidebar class="app-sidebar" />
      <Content class="app-content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './header.vue'
import Sidebar from './sidebar.vue'
import Content from './content.vue'
import { defineComponent } from 'vue-demi'

defineComponent({
  Header,
  Sidebar,
  Content
})
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  display: flex;
  position: fixed;
  padding-top: 50px;
}

.app-content {
  flex: 1;
  padding: 20px 20px 70px 20px;
  background: #f8fbff;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
