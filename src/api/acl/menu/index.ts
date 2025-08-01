import request from '../../../utils/request'
import type { PermissionResponseData, MenuParams } from './type'
const API = {
    ALLPERMISSION_URL: '/admin/acl/permission',
    ADDPERMISSION_URL: '/admin/acl/permission/save',
    UPDATEPERMISSION_URL: '/admin/acl/permission/update',
    DELETEPERMISSION_URL: '/admin/acl/permission/remove/',
}
export const reqAllPermission = (): Promise<PermissionResponseData> => request.get(API.ALLPERMISSION_URL)
export const reqAddOrUpdatePermission = (data: MenuParams): Promise<any> => {
    if (data.id) {
        return request.put(API.UPDATEPERMISSION_URL, data)
    } else {
        return request.post(API.ADDPERMISSION_URL, data)
    }
}
export const reqDeletePermission = (id: number) => request.delete<any, any>(API.DELETEPERMISSION_URL + id)