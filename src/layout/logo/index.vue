<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import setting from '../../setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-tabbar-height;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    color: #fff;
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
