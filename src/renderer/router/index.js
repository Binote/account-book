import Vue from 'vue'
import Router from 'vue-router'
const Layout = () => import('@/views/layout/Layout')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/Login')
    },
    {
      path: '/diesel_acc',
      name: 'diesel_acc',
      components: {
        layout: Layout,
        content: () => import('@/views/dieselAcc/DieselAcc')
      }
    },
    {
      path: '/drivers',
      name: 'drivers',
      components: {
        layout: Layout,
        content: () => import('@/views/drivers/Drivers')
      }
    },
    {
      path: '*',
      name: '404',
      components: {
        layout: Layout,
        content: () => import('@/views/error/404')
      }
    }
  ]
})
