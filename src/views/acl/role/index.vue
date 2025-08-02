<template>
  <div>
    <el-card style="width: 98%">
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入职位关键字" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword.length === 0"
            @click="searchRole"
          >
            搜索
          </el-button>
          <el-button type="default" size="default" @click="refresh">
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-form></el-form>
    </el-card>
    <el-card style="margin: 10px 0; width: 98%">
      <el-button type="primary" size="default" icon="Plus" @click="addRole">
        添加职位
      </el-button>
      <el-table border style="width: 98%; margin: 10px 0" :data="roleList">
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column
          label="职位名称"
          prop="roleName"
          align="center"
          show-overflow-tooltip
          v-model="roleParams"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
              title="分配权限"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              title="编辑"
              @click="updateRole(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.roleName}吗？`"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除"
                >
                  删除
                </el-button>
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
        layout=" prev, pager, next, jumper,->, sizes,total,"
        :total="total"
        @current-change="getHasRole"
        @size-change="sizeChange"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="roleParams.role_id ? '编辑职位' : '添加职位'"
      width="30%"
    >
      <el-form
        label-width="120px"
        :model="roleParams"
        :rules="roleRules"
        ref="roleFormRef"
      >
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入职位名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <el-drawer v-model="drawerVisible" title="分配权限">
      <template #header>
        <h3>分配菜单与按钮权限</h3>
      </template>
      <template #default>
        <el-tree
          :data="menuArr"
          ref="treeRef"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
        />
      </template>
      <template #footer>
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type {
  Records,
  RoleResponseData,
  RoleData,
  MenuResponseData,
  MenuList,
} from '../../../api/acl/role/type'
import {
  reqRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
  reqDeleteRole,
} from '../../../api/acl/role'
import { ElMessage } from 'element-plus'
import useLayOutSettingStore from '../../../store/modules/setting'
const settingStore = useLayOutSettingStore()
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const keyword = ref<string>('')
const roleList = ref<Records>([])
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const drawerVisible = ref<boolean>(false)
const roleParams = reactive<RoleData>({
  roleName: '',
})
const treeRef = ref<any>(null)
const menuArr = ref<MenuList>([])
const selectArr = ref<any>([])
const roleFormRef = ref<any>(null)
const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称长度不能小于2'))
  }
}
const roleRules = reactive<any>({
  roleName: [
    {
      required: true,
      message: '请输入职位名称',
      trigger: 'blur',
      validator: validateRoleName,
    },
  ],
})

onMounted(() => {
  getHasRole()
})
const getHasRole = async (pager: number = 1) => {
  currentPage.value = pager || 1
  console.log('获取角色列表参数:', {
    page: currentPage.value,
    limit: pageSize.value,
    keyword: keyword.value,
  })

  const result: RoleResponseData = await reqRoleList(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  console.log('获取角色列表响应:', result)

  if (result.code === 200) {
    roleList.value = result.data.records
    total.value = result.data.total
    console.log('角色列表数据:', roleList.value)
  } else {
    console.error('获取角色列表失败:', result)
    ElMessage.error(result.message || '获取角色列表失败')
  }
}
const sizeChange = (size: number) => {
  pageSize.value = size
  getHasRole()
}
const searchRole = () => {
  getHasRole()
  keyword.value = ''
}
const refresh = () => {
  settingStore.refresh = !settingStore.refresh
}
const deleteRole = async (row: any) => {
  const result = await reqDeleteRole(row.id)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasRole(
      menuArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error(result.message || '删除失败')
  }
}
const addRole = () => {
  dialogVisible.value = true
  // 清空所有字段，确保是添加模式
  Object.assign(roleParams, {
    id: undefined,
    role_id: undefined,
    roleName: '',
    remark: '',
  })
  nextTick(() => {
    if (roleFormRef.value) {
      roleFormRef.value.clearValidate()
    }
  })
}
const save = async () => {
  await roleFormRef.value.validate()
  const result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.role_id ? '更新成功' : '添加成功',
    })
    dialogVisible.value = false
    getHasRole(roleParams.role_id ? currentPage.value : 1)
  } else {
    ElMessage.error(result.message || '操作失败')
  }
}
const updateRole = (row: any) => {
  dialogVisible.value = true
  Object.assign(roleParams, {
    role_id: row.id,
    roleName: row.roleName,
    remark: row.remark || '',
  })
  nextTick(() => {
    if (roleFormRef.value) {
      roleFormRef.value.clearValidate('roleName')
    }
  })
}
// 设置权限
const setPermission = async (row: RoleData) => {
  Object.assign(roleParams, {
    role_id: row.id,
    roleName: row.roleName,
    remark: row.remark || '',
  })
  drawerVisible.value = true
  // 获取菜单数据
  const result = await reqAllMenuList(row.id as number)
  if (result.code === 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

//抽屉确定按钮
const handler = async () => {
  const roleId = roleParams.role_id as number
  const arr = treeRef.value.getCheckedKeys()
  const arr1 = treeRef.value.getHalfCheckedKeys()
  const permissionId = arr.concat(arr1)

  if (permissionId.length === 0) {
    ElMessage.warning('请至少选择一个权限')
    return
  }

  //下发权限
  const res = await reqSetPermission(roleId, permissionId)

  if (res.code == 200) {
    ElMessage.success('分配权限成功')
    drawerVisible.value = false
    getHasRole(roleParams.role_id ? currentPage.value : 1)
    window.location.reload()
  } else {
    ElMessage.error(res.message || '分配权限失败')
  }
}
</script>
<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}
</style>
