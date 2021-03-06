import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './../routes'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes, // short for `routes: routes`
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
})
