import request from '../../utils/request'
import type { LoginForm, loginResponseData, userResponseData } from './type'
const API = {
    LOGIN_URL: '/user/login',
    USERINFO_URL: '/user/info',
}

export const reqLogin = (data: LoginForm) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
    request.get<any, userResponseData>(API.USERINFO_URL)
