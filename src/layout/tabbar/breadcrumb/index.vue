<template>
  <el-icon style="margin-right: 10px" @click="changeIcon" class="fold-icon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>

  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑需要根据路由的path来生成 -->
    <el-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '../../../store/modules/setting'
import { useRoute } from 'vue-router'
const LayOutSettingStore = useLayOutSettingStore()
const $route = useRoute()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style scoped lang="scss">
.fold-icon {
  color: darkgrey;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #409eff;
  }
}

// 暗黑模式下的样式
:global(.dark) .fold-icon {
  color: #fff;

  &:hover {
    color: #60a5fa;
  }
}
</style>
