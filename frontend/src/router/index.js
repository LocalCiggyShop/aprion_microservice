import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('../views/Blogs.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/createblog',
      name: 'createblog',
      component: () => import('../views/CreateBlog.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//    let token = Vue.cookie.get('session')
//    if (token == null) {
//      next({
//       path: '/',
//       params: { nextUrl: to.fullPath }
//     })
//   }
//  } else {
//   next()
//  }
// })

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (isAuthenticated()) {
//       next()
//     }
//     else {
//       console.log("Auth required!")
//       next('/')
//     }
//   }
// })

export default router
