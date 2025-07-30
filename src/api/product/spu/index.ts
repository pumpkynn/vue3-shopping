//SPU管理模块接口
import request from '../../../utils/request'
import type {
    HasSpuResponseData,
    AllTradeMark,
    SpuHasImage,
    SaleAttrResponseData,
    HASSaleAttrResponseData,
    SpuData,
    SkuData,
    SkuInfoData,
} from './type'
const API = {
    //获取已有的SPU数据
    HASSPU_URL: '/admin/product',
    //获取所有品牌数据
    ALLTRADEMARK_URL: '/admin/product/baseTrademark/getTrademarkList',
    //获取某个SPU下的全部的售卖商品的图片数据
    IMAGE_URL: '/admin/product/spuImageList/',
    //获取某一个SPU下全部的已有的销售属性
    SPUHASSALEATTR_URL: '/admin/product/spuSaleAttrList/',
    //获取已有的全部销售属性接口
    ALLSALEATTR_URL: '/admin/product/baseSaleAttrList',
    ADDSPU_URL: '/admin/product/saveSpuInfo',
    //修改SPU
    UPDATESPU_URL: '/admin/product/updateSpuInfo',
    ADDSKU_URL: '/admin/product/saveSkuInfo',
    SKUINFO_URL: '/admin/product/findBySpuId/',
    REMOVESPU_URL: '/admin/product/deleteSku/',
}
export const reqHasSpu = (
    page: number,
    limit: number,
    category3Id: number | string,
) =>
    request.get<any, HasSpuResponseData>(
        API.HASSPU_URL + `/${page}/${limit}?category3Id=${category3Id}`,
    )
export const reqAllTrademark = () =>
    request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) =>
    request.get<any, SpuHasImage>(API.IMAGE_URL + `${spuId}`)

export const reqSpuHasSaleAttr = (spuId: number) =>
    request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + `${spuId}`)

export const reqAllSaleAttr = () =>
    request.get<any, HASSaleAttrResponseData>(API.ALLSALEATTR_URL)
//添加新的spu接口
export const reqAddOrUpdateSpu = (data: SpuData) => {
    if (data.id) {
        return request.post<any, any>(API.UPDATESPU_URL, data)
    } else {
        return request.post<any, any>(API.ADDSPU_URL, data)
    }
}
export const reqAddSku = (data: SkuData) =>
    request.post<any, any>(API.ADDSKU_URL, data)

export const reqSkuList = (spuId: number) =>
    request.get<any, SkuInfoData>(API.SKUINFO_URL + `${spuId}`)
export const reqRemoveSku = (skuId: number) =>
    request.delete<any, any>(API.REMOVESPU_URL + `${skuId}`)
