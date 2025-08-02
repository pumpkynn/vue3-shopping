<template>
  <div>
    <el-table
      border
      style="width: 98%; margin: 10px 0"
      row-key="id"
      :data="permissionList"
    >
      <el-table-column
        label="名称"
        prop="name"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        label="权限值"
        prop="code"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column label="级别" prop="level" align="center" sortable>
        <template #header>
          <el-tooltip
            content="1=顶级菜单，2=子菜单，3=子菜单的子菜单"
            placement="top"
          >
            <span>
              级别
              <el-icon><QuestionFilled /></el-icon>
            </span>
          </el-tooltip>
        </template>
        <template #default="{ row }">
          <el-tag
            :type="
              row.level === 1
                ? 'primary'
                : row.level === 2
                  ? 'success'
                  : 'warning'
            "
          >
            {{ row.level }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center" sortable>
        <template #header>
          <el-tooltip
            content="1=菜单权限，2=按钮权限，3=接口权限"
            placement="top"
          >
            <span>
              类型
              <el-icon><QuestionFilled /></el-icon>
            </span>
          </el-tooltip>
        </template>
        <template #default="{ row }">
          <el-tag
            :type="
              row.type === 1 ? 'info' : row.type === 2 ? 'warning' : 'danger'
            "
          >
            {{ row.type === 1 ? '菜单' : row.type === 2 ? '按钮' : '接口' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Plus"
            :title="row.level == 3 ? '添加功能' : '添加菜单'"
            :disabled="row.level == 4 ? true : false"
            @click="addPermission(row)"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            title="编辑"
            :disabled="row.level == 1 ? true : false"
            @click="updatePermission(row)"
          ></el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="deletePermission(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除"
                :disabled="row.level == 1 ? true : false"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
      <el-form label-width="120px">
        <el-form-item label="菜单名称">
          <el-input v-model="menuData.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="menuData.code" placeholder="请输入权限值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdatePermission,
  reqDeletePermission,
} from '../../../api/acl/menu'
import type {
  PermissionList,
  PermissionResponseData,
  MenuParams,
} from '../../../api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'
const permissionList = ref<PermissionList>([])
const dialogVisible = ref(false)
const menuData = reactive<MenuParams>({
  name: '',
  code: '',
  level: 1,
  pid: 0,
})
onMounted(() => {
  getHasPermission()
})
const addPermission = (row: any) => {
  Object.assign(menuData, {
    code: '',
    level: 0,
    pid: 0,
    name: '',
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id
}
const updatePermission = (row: any) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
}
const getHasPermission = async () => {
  const result: PermissionResponseData = await reqAllPermission()
  if (result.code == 200) {
    // 检查数据结构 - 兼容两种格式
    if (result.data && result.data.records) {
      // 格式1: { data: { records: [], total: number } }
      permissionList.value = result.data.records
    } else if (Array.isArray(result.data)) {
      // 格式2: { data: [] } - 直接是数组
      permissionList.value = result.data
    } else {
      ElMessage.warning('数据格式异常')
    }
  } else {
    ElMessage.error(`获取权限数据失败: ${result.message || '未知错误'}`)
  }
}
const save = async () => {
  const result: any = await reqAddOrUpdatePermission(menuData)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: menuData.id ? '修改成功' : '添加成功',
    })
    dialogVisible.value = false
    getHasPermission()
  } else {
    ElMessage({
      type: 'error',
      message: menuData.id ? '修改失败' : '添加失败',
    })
  }
}
const deletePermission = async (id: number) => {
  const result: any = await reqDeletePermission(id)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getHasPermission()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>
<style scoped lang="scss"></style>
