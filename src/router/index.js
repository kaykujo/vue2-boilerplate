import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@/router/routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.dontJumpToTop)) {
    window.scrollTo(0, 0)
  }
})

router.beforeEach((to, from, next) => {
  const tokenIsValid = Vue.Helper.validateToken()

  if (to.matched.some(record => record.meta.requiresAuth)) { // Logged in user/admin only
    if (!tokenIsValid) {
      next({
        name: 'login',
        query: {
          returnUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) { // Non user only. Eg: Auth pages
    if (!tokenIsValid) {
      next()
    } else {
      next({
        name: 'home'
      })
    }
  } else {
    next()
  }
})

export default router