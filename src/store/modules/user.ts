import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '../../api/user/index'
import type { LoginForm, loginResponseData } from '../../api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
import { constantRoute } from '../../router/routers'
const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            token: GET_TOKEN() || '',
            menuRoutes: constantRoute,
            username: 'Admin',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
    },
    actions: {
        //用户登录的方法
        async userLogin(data: LoginForm) {
            let result: loginResponseData = await reqLogin(data);
            if (result.code == 200) {
                this.token = (result.data.token as string);
                SET_TOKEN(this.token as string);
                return true;
            } else {
                throw new Error(result.data.message || '登录失败');
            }
        },
        //获取用户信息的方法
        async userInfo() {
            let result = await reqUserInfo()
            if (result.code == 200) {
                this.username = result.data.checkUser.username
                // 头像始终使用指定URL
                this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                return 'ok'
            } else {
                return Promise.reject('获取用户信息失败')
            }
        },
        //退出登录的方法
        async userLogout() {
            this.token = '',
                this.username = '',
                this.avatar = '',
                REMOVE_TOKEN()
        }
    },
    getters: {}
})

export default useUserStore