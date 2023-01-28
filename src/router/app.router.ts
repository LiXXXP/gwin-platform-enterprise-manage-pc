import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '/basic',
    name: 'basic',
    component: Layout,
    redirect: '/basic/user',
    meta: { title: '企业信息', icon: 'gwin-certification' },
    children: [
      {
        path: 'user',
        name: 'basic',
        component: () => import('@/views/basic/user.vue'),
        meta: {
          title: '企业基本信息',
          icon: '',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/identity',
    name: 'identity',
    component: Layout,
    redirect: '/identity/authentication',
    meta: { title: '企业认证', icon: 'gwin-product' },
    children: [
      {
        path: 'authentication',
        name: 'authentication',
        component: () => import('@/views/basic/authentication.vue'),
        meta: {
          title: '认证信息',
          icon: ''
        }
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import('@/views/basic/contacts.vue'),
        meta: {
          title: '联系人管理',
          icon: '',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user',
    meta: { title: '成员配置', icon: 'gwin-configuration' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '成员管理', icon: '' }
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/system/group/index.vue'),
        meta: { title: '组织架构', icon: '' }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: { title: '权限管理', icon: 'gwin-management' },
    redirect: '/enterprise/jurisdiction',
    children: [
      {
        path: 'enterprise/role',
        name: 'projectRole',
        component: () => import('@/views/system/role/role.vue'),
        meta: { title: '企业权限', icon: '' }
      },
      {
        path: 'enterprise/jurisdiction',
        name: 'enterpriseJurisdiction',
        component: () => import('@/views/system/role/jurisdiction.vue'),
        meta: { title: '企业权限详情', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'product',
    meta: { title: '产品中心', icon: 'icon-product' },
    redirect: 'product/product',
    children: [
      {
        path: 'productList',
        name: 'productList',
        component: () => import('@/views/product/productList.vue'),
        meta: { title: ' 我的产品', icon: 'add' }
      },
      {
        path: 'productDetails',
        name: 'productDetails',
        component: () => import('@/views/product/productDetails.vue'),
        meta: { title: '产品详情', icon: 'about' },
        hidden: true
      },
      {
        path: 'productOpen',
        name: 'productOpen',
        component: () => import('@/views/product/productOpen.vue'),
        meta: { title: '产品开通记录', icon: 'about' }
      },
      {
        path: 'productRecord',
        name: 'productRecord',
        component: () => import('@/views/product/productRecord.vue'),
        meta: { title: '产品开通记录详情', icon: 'about' },
        hidden: true
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/product/role/role.vue'),
        meta: { title: '产品权限', icon: 'about' }
      },
      {
        path: 'jurisdiction',
        name: 'jurisdiction',
        component: () => import('@/views/product/role/jurisdiction.vue'),
        meta: { title: '产品权限详情', icon: 'about' },
        hidden: true
      }
    ]
  }
]

export default appRoutes
