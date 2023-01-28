<template>
  <div>
    <console-menu :menu-list="state.menuList"></console-menu>
  </div>
</template>

<script setup lang="ts">
import { ConsoleMenu } from '@gwin/platform-menu-pc'
import { computed, onMounted, reactive } from 'vue-demi'
import { useRouter } from 'vue-router'
import { RouteConfig } from '#/global'
import base from '@/api/base'
import Cookies from 'js-cookie'

const router = useRouter()

interface MenuItem {
  title?: string
  icon?: string
  router?: string
  child?: MenuItem[]
  noCache?: boolean
  menuList?: string[]
}

const state: MenuItem = reactive({
  menuList: []
})

const data = computed(() => {
  const menuList: MenuItem[] = []
  router.options.routes.forEach((route) => {
    const menuItem: MenuItem | undefined = generateMenuItem(route as RouteConfig)
    if (menuItem) {
      menuList.push(menuItem)
    }
  })
  return menuList
})

onMounted(() => {
  // 获取权限菜单
  base
    .UserSubjectResourceListInquiry({
      subjectId: Cookies.get('entityId'),
      userId: Cookies.get('userId')
    })
    .then((res) => {
      if (res.status.success) {
        menuCompare(data.value, res.body.resourceList)
      }
    })
})

function menuCompare(router: any[], newRouter: any[]) {
  const menu: any[] = []
  router.forEach((item, index) => {
    newRouter.forEach((element) => {
      if (item.router === element.resourcePath) {
        const list = JSON.parse(JSON.stringify(item))
        menu[index] = list
        menu[index].child = []
        item.child.forEach((list: { router: any }) => {
          element.childrenResources.forEach((name: { resourcePath: any }) => {
            if (list.router === name.resourcePath) {
              menu[index].child.push(JSON.parse(JSON.stringify(list)))
            }
          })
        })
      }
    })
  })
  const newList: any[] | undefined = []
  menu.forEach((item) => {
    newList.push(item)
  })
  state.menuList = newList
}

function generateMenuItem(route: RouteConfig): MenuItem | undefined {
  if (!route.hidden && route.meta) {
    const menuItem: MenuItem = route.meta
    menuItem.router = route.path
    if (route.children) {
      menuItem.child = []
      route.children.forEach((r) => {
        const subMenuItem: MenuItem | undefined = generateMenuItem(r as RouteConfig)
        if (subMenuItem) {
          subMenuItem.router = menuItem.router + '/' + subMenuItem.router
          menuItem.child?.push(subMenuItem)
        }
      })
    }
    return menuItem
  }
  return undefined
}
</script>

<style lang="scss" scoped></style>
