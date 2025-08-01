//书写属性相关的api
import request from '../../../utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
const API = {
  C1_URL: '/admin/product/getCategory1',
  C2_URL: '/admin/product/getCategory2/',
  C3_URL: '/admin/product/getCategory3/',
  //获取分类下的属性和属性值
  ATTR_URL: '/admin/product/attrInfoList/',
  //添加属性
  ADDORUPDATE_URL: '/admin/product/saveAttrInfo',
  //删除属性
  DELETEATTR_URL: '/admin/product/deleteAttr/',
  //修改属性
  UPDATE_ATTR_URL: '/admin/product/updateAttr/',

}
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//获取二级分类的接口,需要携带参数，根据一级分类的id获取二级分类
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
//获取三级分类的接口,需要携带参数，根据二级分类的id获取三级分类
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + category1Id + '/' + category2Id + '/' + category3Id,
  )
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATE_URL, data)
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
