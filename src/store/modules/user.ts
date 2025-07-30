import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '../../api/user/index'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
import { constantRoute } from '../../router/routers'
const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            token: GET_TOKEN() || '',
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
        }
    },
    actions: {
        //用户登录的方法
        async userLogin(data: any) {
            console.log('登录传入的数据', data)
            let result: any = await reqLogin(data)
            console.log('接口返回的数据', result)
            if (result.code == 200) {
                this.token = result.data as string
                SET_TOKEN(this.token)
                return true
            } else {
                throw new Error(result.data.message || '登录失败')
            }
        },
        //获取用户信息的方法
        async userInfo() {
            let result = await reqUserInfo()
            console.log('用户信息', result.data)
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject('获取用户信息失败')
            }
        },
        //退出登录的方法
        async userLogout() {
            let result = await reqLogout()
            console.log('退出登录', result)
            if (result.code == 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
    },
    getters: {},
})

export default useUserStore
