import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index'
import type { LoginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN } from '@/utils/token'
const useUserStore = defineStore('user', {
    state: (): UserState => {
        return { token: localStorage.getItem('TOKEN') || '' }
    },
    actions: {
        async userLogin(data: LoginForm) {
            let result: loginResponseData = await reqLogin(data);
            if (result.code == 200) {
                this.token = (result.data.token as string);
                SET_TOKEN(this.token as string);
                return true;
            } else {
                throw new Error(result.data.message || '登录失败');
            }
        }
    },
    getters: {}
})

export default useUserStore