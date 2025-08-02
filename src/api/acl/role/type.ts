export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface RoleData {
  id?: number
  role_id?: number // 添加 role_id 字段用于更新
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: string
}
export type Records = RoleData[]
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: number
    optimizeCountSql: boolean
    hitCount: boolean
    countId: string
    maxLimit: number
    searchCount: boolean
    pages: number
  }
}
//菜单与按钮数据的ts类型
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: boolean
  level: number
  children?: MenuList[]
  select: boolean
}
export type MenuList = MenuData[]
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
