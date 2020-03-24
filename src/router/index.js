import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let user = Cookies.get('email');
//
//   if (!user) next('login')
//   else if (user) next('hello')
//   else next()
// })

export default router
