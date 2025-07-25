<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有children -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute(item)"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有children但children.length === 1 -->
    <template v-else-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute(item.children[0])"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有children且children.length>1 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children" @goRoute="goRoute"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const $router = useRouter()
defineProps(['menuList'])
const goRoute = (vc: any) => {
  $router.push(vc.path)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
