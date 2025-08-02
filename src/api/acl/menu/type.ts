export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface Permission {
  id?: number
  name: string
  code: string
  level: number
  pid: number
  createTime?: string
  updateTime?: string
  toCode?: string
  type?: number
  status?: null
  select?: boolean
  children?: PermissionList
}
export type PermissionList = Permission[]

export interface PermissionResponseData extends ResponseData {
  data: {
    records: PermissionList
    total: number
  }
}
export interface MenuParams {
  id?: number
  name: string
  code: string
  level: number
  pid: number
}
