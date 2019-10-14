import Vue from 'vue'
import Router from 'vue-router'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  routes: [
    {
      path: '/football/',
      name: 'list',
      component: List
    },
    {
      path: '/football/adduser',
      name: 'adduser',
      component: () => import(/* webpackChunkName: "AddUser" */ './views/AddUser.vue')
    },
    {
      path: '/football/edituser/:id',
      name: 'edituser',
      component: () => import(/* webpackChunkName: "EditUser" */ './views/AddUser.vue')
    }
  ]
})
