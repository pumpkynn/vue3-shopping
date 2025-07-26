<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
    style="margin-right: 5px;"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="FullScreen"
    style="margin-right: 5px;"
  ></el-button>
  <el-button 
    size="small" 
    icon="Setting" 
    circle 
    @click="showThemeDrawer = true"
    style="margin-right: 10px;"
  ></el-button>
 
  <img
    :src="userStore.avatar"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-drawer
    v-model="showThemeDrawer"
    title="主题设置"
    direction="rtl"
    size="260px"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" :predefine="predefineColors" size="small" @change="changeColor" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch :active-icon="Moon" :inactive-icon="Sunny" size="small" v-model="isDark" class="mt-2"
          @change="changeDark"
          inline-prompt />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import useLayOutSettingStore from '../../../store/modules/setting'
import useUserStore from '../../../store/modules/user'
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
const LayOutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()
const isDark = ref<boolean>(document.documentElement.classList.contains('dark'))
const showThemeDrawer = ref(false)
const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}
const FullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const color = ref(getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary') || '#409EFF')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const logout = async () => {
  await userStore.userLogout()
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  })
}
const changeDark = () => {
  const html = document.documentElement
  isDark.value?html.className='dark':html.className=''
}
const changeColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  html.style.setProperty('--el-color-primary-light-3', color.value)
  html.style.setProperty('--el-color-primary-light-5', color.value)
  html.style.setProperty('--el-color-primary-light-7', color.value)
  html.style.setProperty('--el-color-primary-light-8', color.value)
  html.style.setProperty('--el-color-primary-light-9', color.value)
  html.style.setProperty('--el-color-primary-dark-2', color.value)
}
</script>
<style scoped lang="scss">
.el-dropdown-link {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.el-dropdown-link:focus,
.el-dropdown-link:hover,
.el-dropdown-link:active {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

</style>
