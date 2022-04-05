import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import constantRoute from './constantRoutes'

export const constantRoutes = constantRoute

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router