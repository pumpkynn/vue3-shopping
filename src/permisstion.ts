//路由鉴权，项目当中路由能不能访问，取决于用户有没有权限
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({
  showSpinner: false,
})
import useUserStore from './store/modules/user'
import pinia from './store'
import settings from './setting'
let userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${settings.title}-${to.meta.title}`
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path == '/login') {
      next({ path: '/home', query: { redirect: to.path } })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          //token过期
          //用户手动清理本地token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path },
      })
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done()
})
