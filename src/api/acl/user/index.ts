import request from '../../../utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'
const API = {
  ALLUSER_URL: '/admin/acl/user',
  ADDUSER_URL: '/admin/acl/user/save',
  UPDATEUSER_URL: '/admin/acl/user/update',
  ALLROLE_URL: '/admin/acl/user/toAssign',
  SETROLE_URL: '/admin/acl/user/doAssignRole',
  DELETEUSER_URL: '/admin/acl/user/remove',
  DELETEALLUSER_URL: '/admin/acl/user/batchRemove',
}
export const reqUserInfo = (page: number, limit: number, username?: string) => {
  let url = API.ALLUSER_URL + `/${page}/${limit}`
  if (username && username.trim()) {
    url += `?username=${encodeURIComponent(username.trim())}`
  }
  return request.get<any, UserResponseData>(url)
}
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + `/${userId}`)
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
// 删除单个用户
export const reqRemoveUser = (userId: number) => {
  const url = API.DELETEUSER_URL + `/${userId}`
  console.log('删除用户请求URL:', url, '用户ID:', userId)
  return request.delete<any, any>(url)
}

// 批量删除用户
export const reqDeleteUserBatch = (idList: number[]) => {
  console.log('批量删除用户ID列表:', idList)
  return request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })
}
