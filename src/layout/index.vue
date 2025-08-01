<template>
  <div class="layout_container">
    <div 
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="LayOutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="#409EFF"
        >
          <Menu :menuList="menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

import useUserStore from '../store/modules/user'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import useLayOutSettingStore from '../store/modules/setting'
const LayOutSettingStore = useLayOutSettingStore()

const userStore = useUserStore()
const $router = useRouter()
console.log($router.currentRoute.value.path)
const menuRoutes = computed(() => userStore.menuRoutes || [])
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.layout_slider {
  width: $base-menu-width;
  height: 100%;
  background-color: $base-menu-background;
  transition: all 0.3s;
  .el-menu {
    border-right: none;
    height: 100%;
    width: 100%;
  }
  .logo {
    width: 100%;
    height: $base-logo-height;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      font-size: 20px;
      transition: all 0.5s;
    }
  }
  .scrollbar {
    height: calc(100% - $base-logo-height);
    // 不加 width
  }
  &.fold{
    width: $base-menu-min-width;
  }
}
.layout_tabbar {
  position: absolute;
  top: 0px;
  left: calc($base-menu-width - 1px);
  width: calc(100% - $base-menu-width);
  height: $base-tabbar-height;
  color: black;
  transition: all 0.3s;
  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}

.layout_main {
  position: absolute;
  left: $base-menu-width;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-tabbar-height);
  top: $base-tabbar-height;
  
  padding: 20px;
  overflow: auto;
  // border: 1px solid rgb(228, 228, 231);
  border-right: none;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
</style>
