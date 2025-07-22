// 常量路由
export const constantRoute = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login'
    },
    {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
        name: 'layout'
    },
    {
        path: '/404',
        component: () => import('@/views/404/404.vue'),
        name: '404'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any'
    }
]