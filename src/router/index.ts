import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import appRoutes from './app.router'
import commonRoutes from './common.router'
import { setTitle } from '@/utils/index'
import getPageTitle from '@/utils/get-page-title'

const routes: Array<RouteRecordRaw> = [...commonRoutes, ...appRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  /* 设置title */
  if (to.meta.title) {
    const titles = getPageTitle(String(to.meta.title))
    setTitle(titles)
  }
  next()
})

export default router
