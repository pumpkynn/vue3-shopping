//服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有的SPU数据类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImage[]
}
//数组：元素是已有SPU的数据类型
export type Records = SpuData[]
//获取已有的SPU接口返回的数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
//所有品牌数据的ts类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}
//获取所有品牌接口返回的数据类型
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  name?: string
  url?: string
}
//已有的spu照片的数据的图片类型
export interface SpuHasImage extends ResponseData {
  data: SpuImage[]
}
//已有的销售属性值的数据类型
export interface SaleAttrValue {
  id?: number
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId?: number | string
  saleAttrName?: string
  saleAttrValueName?: string
  isChecked?: boolean | null
  saleAttrId?: number | string
  saleAttrValueId?: number | string
}
//存储已有的销售属性值的列表的数据类型
export type spuSaleAttrValueList = SaleAttrValue[]
//已有的销售属性接口返回的数据类型

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
//已有的全部销售属性接口返回的数据类型
export interface HasSaleAttr {
  id: number
  name: string
}
//添加SPU接口的ts类型
export interface HASSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId?: number
  saleAttrName?: string
  spuSaleAttrValueList?: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
  saleAttrValueName?: string
}
export interface Attr {
  attrId: number | string
  valueId: number | string
}
export interface SkuData {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  skuDesc: string
  weight: number
  price: number
  skuDefaultImg: string
  spuSaleAttrValueList?: SaleAttrValue[]
  skuAttrValueList?: Attr[]
}
export default {}
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
