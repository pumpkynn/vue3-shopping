<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p v-show="!LayOutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import setting from '../../setting'
import useLayOutSettingStore from '../../store/modules/setting'

const LayOutSettingStore = useLayOutSettingStore()
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

  align-items: center;
  justify-content: center;
 
  img {
    width: 40px;
    height: 40px;
  }
  p {
    color: #fff !important;
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    transition: all 0.3s;
  }
}
</style>
