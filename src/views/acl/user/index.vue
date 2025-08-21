<template>
  <div>
    <el-card style="width: 98%">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入搜索用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword.length === 0"
            @click="searchUser()"
          >
            搜索
          </el-button>
          <el-button type="default" size="default" @click="refresh">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0; width: 98%">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-popconfirm
        :title="`确定删除选中的 ${selectIds.length} 个用户吗？`"
        @confirm="deleteSelectUsers"
      >
        <template #reference>
          <el-button
            type="danger"
            size="default"
            :disabled="selectIds.length === 0"
          >
            批量删除({{ selectIds.length }})
          </el-button>
        </template>
      </el-popconfirm>
      <!-- table展示用户信息 -->
      <el-table
        style="margin: 10px 0"
        border
        :data="userArr"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column
          label="用户名字"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column label="用户角色" width="180" align="center">
          <template #default="{ row }">
            <div
              v-if="row.roleName && row.roleName.trim()"
              style="display: flex; flex-wrap: wrap; gap: 4px"
            >
              <el-tag
                v-for="role in row.roleName.split(',')"
                :key="role.trim()"
                type="primary"
                size="small"
              >
                {{ role.trim() }}
              </el-tag>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180"
          align="center"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          width="180"
          align="center"
          prop="updateTime"
        ></el-table-column>
        <el-table-column label="操作" width="260px" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              title="分配角色"
              @click="setRole(row)"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              title="编辑"
              @click="updateUser(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.name}吗？`"
              @confirm="removeUser(row.id)"
              width="200"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes,total "
        :total="total"
        @current-change="getHasUser"
        @size-change="handlerSize"
      />
    </el-card>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="userFormRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="请输入用户密码"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="default" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="save">确定</el-button>
      </template>
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配用户角色(职位)</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请输入用户名"
              v-model="userParams.username"
              disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <br />
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckChange"
              style="display: flex; flex-wrap: wrap; gap: 10px"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :label="role.roleName"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { reqAllRole } from '../../../api/acl/user'
import { ElMessage } from 'element-plus'
import useLayoutSettingStore from '../../../store/modules/setting'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqSetUserRole,
  reqRemoveUser,
  reqDeleteUserBatch,
} from '../../../api/acl/user'
import type {
  Records,
  UserResponseData,
  User,
  AllRoleResponseData,
  RoleData,
  SetRoleData,
} from '../../../api/acl/user/type'
import { onMounted } from 'vue'
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const userArr = ref<Records>([])
const drawer = ref<boolean>(false)
const drawer1 = ref<boolean>(false)
const selectIds = ref<User[]>([])
const keyword = ref<string>('')
const userParams = reactive<User>({
  username: '',
  password: '',
  name: '',
})
const userFormRef = ref<any>()
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const SettingStore = useLayoutSettingStore()
// 验证用户名
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度不能小于5位'))
  }
}
// 验证用户昵称
const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称长度不能小于5位'))
  }
}
// 验证用户密码
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码长度不能小于6位'))
  }
}
const rules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  name: [
    {
      required: true,
      message: '请输入用户昵称',
      trigger: 'blur',
      validator: validateName,
    },
  ],
  password: [
    {
      required: true,
      message: '请输入用户密码',
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
})

const getHasUser = async (pager = 1) => {
  currentPage.value = pager
  const result: UserResponseData = await reqUserInfo(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    userArr.value = result.data.records
    total.value = result.data.total
  }
}
const handlerSize = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  getHasUser(1)
}
const addUser = () => {
  Object.assign(userParams, {
    id: 0,
    username: '',
    password: '',
    name: '',
  })
  nextTick(() => {
    userFormRef.value.clearValidate('username')
    userFormRef.value.clearValidate('name')
    userFormRef.value.clearValidate('password')
  })
  drawer.value = true
}
const save = async () => {
  await userFormRef.value.validate()
  const result: any = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    getHasUser(userParams.id ? currentPage.value : 1)
    window.location.reload()
    drawer.value = false
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '添加失败',
    })
  }
}
const cancel = () => {
  drawer.value = false
  Object.assign(userParams, {
    username: '',
    password: '',
    name: '',
  })
}
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    userFormRef.value.clearValidate('username')
    userFormRef.value.clearValidate('name')
  })
}
const allRole = ref<RoleData[]>([])
const userRole = ref<string[]>([])
const setRole = async (row: User) => {
  drawer1.value = true
  Object.assign(userParams, row)
  const result: AllRoleResponseData = await reqAllRole(row.id as number)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList

    // 直接使用表格中显示的roleName来设置已勾选的角色
    if (row.roleName && row.roleName.trim()) {
      // 将roleName按逗号分割成数组
      userRole.value = row.roleName
        .split(',')
        .map((role) => role.trim())
        .filter((role) => role)
    } else {
      // 用户没有角色
      userRole.value = []
    }

    drawer1.value = true
  }
}
onMounted(() => {
  getHasUser()
})
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value.map((role) => role.roleName || '') : []
  isIndeterminate.value = false
}
const handleCheckChange = (val: string[]) => {
  const checkedCount = val.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}
const confirm = async () => {
  const data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value
      .map((roleName) => {
        const role = allRole.value.find((r) => r.roleName === roleName)
        return role?.id as number
      })
      .filter((id) => id !== undefined),
  }
  const result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配成功',
    })

    // 手动更新当前用户的roleName为选中的角色组合
    const selectedRoleNames = userRole.value.join(',')
    const userIndex = userArr.value.findIndex(
      (user) => user.id === userParams.id,
    )
    if (userIndex !== -1) {
      userArr.value[userIndex].roleName = selectedRoleNames
    }

    drawer1.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '分配失败',
    })
  }
  console.log('userArr.value', userArr.value)
}
// 删除单个用户
const removeUser = async (id: number) => {
  try {
    console.log('要删除的用户ID:', id, '类型:', typeof id)
    const result: any = await reqRemoveUser(id)
    console.log('删除用户响应:', result)

    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getHasUser()
    } else {
      ElMessage({
        type: 'error',
        message: result.message || '删除失败',
      })
    }
  } catch (error) {
    console.error('删除用户错误:', error)
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 批量删除用户
const deleteSelectUsers = async () => {
  try {
    let idList = selectIds.value.map((item) => item.id as number)
    console.log('批量删除用户ID列表:', idList)

    const result: any = await reqDeleteUserBatch(idList)
    console.log('批量删除响应:', result)

    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '批量删除成功',
      })
      getHasUser()
    } else {
      ElMessage({
        type: 'error',
        message: result.message || '批量删除失败',
      })
    }
  } catch (error) {
    console.error('批量删除用户错误:', error)
    ElMessage({
      type: 'error',
      message: '批量删除失败',
    })
  }
}
// 选择变化处理
const selectChange = (newSelection: User[]) => {
  selectIds.value = newSelection
}
const searchUser = () => {
  getHasUser()
  keyword.value = ''
}
const refresh = () => {
  SettingStore.refresh = !SettingStore.refresh
}
</script>
<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}
</style>
