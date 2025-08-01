import request from "../../../utils/request";
import type { RoleResponseData, RoleData, MenuResponseData } from "./type";
const API = {
    ALLROLE_URL: '/admin/acl/role',
    ADDROLE_URL: '/admin/acl/role/save',
    UPDATEROLE_URL: '/admin/acl/role/update',
    ALLPERMISSION: '/admin/acl/permission/toAssign',
    DOASSIGN_URL: '/admin/acl/permission/doAssign',
    DELETE_URL: '/admin/acl/role/remove',
}
export const reqRoleList = (page: number, limit: number, roleName?: string) => {
    let url = API.ALLROLE_URL + `/${page}/${limit}`
    if (roleName && roleName.trim()) {
        url += `?roleName=${encodeURIComponent(roleName.trim())}`
    }
    return request.get<any, RoleResponseData>(url)
}
export const reqAddOrUpdateRole = (role: RoleData) => {
    console.log('API 判断参数:', { id: role.id, role_id: role.role_id })
    if (role.role_id) {
        console.log('使用更新接口:', API.UPDATEROLE_URL)
        return request.put<any, any>(API.UPDATEROLE_URL, role)
    } else {
        console.log('使用添加接口:', API.ADDROLE_URL)
        return request.post<any, any>(API.ADDROLE_URL, role)
    }
}
export const reqAllMenuList = (roleId: number) => {
    return request.get<any, MenuResponseData>(API.ALLPERMISSION + `/${roleId}`)
}
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
    // 根据后端代码，使用query参数格式
    const permissionIdStr = permissionId.join(',')
    const url = API.DOASSIGN_URL + `?roleId=${roleId}&permissionId=${permissionIdStr}`

    console.log('分配权限请求URL:', url)
    console.log('分配权限请求参数:', { roleId, permissionId, permissionIdStr })
    return request.post<any, any>(url)
}
export const reqDeleteRole = (roleId: number) => {
    return request.delete<any, any>(API.DELETE_URL + `/${roleId}`)
}