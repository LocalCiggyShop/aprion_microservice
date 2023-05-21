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
      component: () => import('../views/Blog/Blogs.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/createblog',
      name: 'createblog',
      component: () => import('../views/Blog/CreateBlog.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/deleteblog',
      name: 'deleteblog',
      component: () => import('../views/Blog/DeleteBlog.vue'),
      meta: { requiresAdmin: false }
    }
  ]
})

// Temporary
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('user'));
    if(!user)
      next('/login');
    else 
      next();
  } else if(to.matched.some(record => record.meta.requiresAdmin)) {
    next('/login');
  }
  else 
    next();
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
//     if (1) {
//       console.log("next")
//       next()
//     }
//     else {
//       console.log("Auth required!")
//       next('/')
//     }
//   }
// })

// beforeRouteLeave (to, from) {
//   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//   if (!answer) return false
// }

export default router
