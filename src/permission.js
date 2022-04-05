import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // 白名单
    //前置守卫
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()
        // set page title
    document.title = getPageTitle(to.meta.title)
        // 得到token
    const hasToken = getToken()
    if (hasToken) {
        // 已经有token
        const hasGetUserInfo = store.getters['user/user']
            //有token 有名字 放行 
        if (hasGetUserInfo) {
            if (to.path === '/login') {
                next({ path: '/' })
            }
            next()
            NProgress.done()
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                // 白名单直接放行
                next()
            }
            // 有token没有名字
            try {
                // 看看你是谁
                await store.dispatch('user/getInfo')
                next()
            } catch (error) {
                // 说明你的token有问题 你要重新登录
                await store.dispatch('user/resetToken')
                this.$message.error(error || '你需要重新登录')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }

    } else {
        /*没有token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // 直接放行
            next()
        } else {
            //不在白名单里面的，没有这个权限，重顶向到登录页）
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})