import { constantRoute } from './routers'
//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})
export default router
