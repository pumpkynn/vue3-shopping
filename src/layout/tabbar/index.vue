<template>
  <div class="tabbar">
    <div class="tabbar_left">
        <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
        <Setting></Setting>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
    name: 'Tabbar'
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(to right, white,white);
  .tabbar_left {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
}

</style>