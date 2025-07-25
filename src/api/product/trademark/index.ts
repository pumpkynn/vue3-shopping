// 品牌管理接口
import request from '../../../utils/request'
import type { TrademarkResponseData } from './type'
import type { Trademark } from './type'
const API = {
    TRADEMARK_URL: '/admin/product/baseTrademark/',
    ADD_TRADEMARK_URL: '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL: '/admin/product/baseTrademark/update',
    DELETE_TRADEMARK_URL: '/admin/product/baseTrademark/remove/',
}
//page:获取第几页，limit:获取几条
export const reqHasTrademark = (page: number, limit: number) =>
    request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
//添加与修改已有的品牌的接口方法
export const reqAddOrUpdateTrademark = (data: Trademark) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
    } else {
        return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
    }
}
export const reqDeleteTrademark = (id: number) => {
    return request.delete<any, any>(API.DELETE_TRADEMARK_URL + `${id}`)
}