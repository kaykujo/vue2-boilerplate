import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const homeRoute = 'home'
const authRoute = 'login'

let router = new Router({
  routes: [{
    path: '/',
    name: 'landing',
    redirect: {
      name: homeRoute
    }
  }, {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      guest: true,
      layout: 'empty'
    }
  }]
})

router.beforeEach((to, from, next) => {
  const tokenIsValid = Vue.Helper.validateToken()

  if (!to.matched.some(record => record.meta.dontJumpToTop)) {
    window.scrollTo(0, 0)
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!tokenIsValid) {
      next({
        path: authRoute,
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))

      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin == 1) {
          next()
        } else {
          next({
            name: homeRoute
          })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!tokenIsValid) {
      next()
    } else {
      next({
        name: homeRoute
      })
    }
  } else {
    next()
  }
})

export default router