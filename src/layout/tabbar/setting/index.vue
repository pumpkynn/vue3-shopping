<template>
     <el-button  size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
      <el-button
        
        size="small"
        icon="FullScreen"
        circle
        @click="FullScreen"
      ></el-button>
      <el-button  size="small" icon="Setting" circle></el-button>
      <img
        :src="userStore.avatar"
        alt=""
        style="width: 24px; height: 24px; margin:0 10px; border-radius: 50%"
        
      />
       <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            
          </el-dropdown-menu>
        </template>
      </el-dropdown>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '../../../store/modules/setting'
import useUserStore from '../../../store/modules/user'
import { useRouter, useRoute} from 'vue-router'
let $router = useRouter()
let $route = useRoute()
const LayOutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()
const updateRefresh = () => {
    LayOutSettingStore.refresh = !LayOutSettingStore.refresh
} 
const FullScreen = () => {
    //Dom对象的一个属性，用来判断当前是不是全屏，[全屏：true，非全屏：false]
   
   if(!document.fullscreenElement){
    //利用文档的根节点的requestFullscreen方法实现全屏
    document.documentElement.requestFullscreen()
   }else{
    //利用文档的根节点的exitFullscreen方法实现退出全屏
    document.exitFullscreen()
   }
}
const logout = () => {
  //退出登录，向服务器发请求[退出登录接口]
   userStore.userLogout()
   $router.push({
    path:'/login',
    query:{
        redirect:$route.path
    }
   })
}
</script>
<script lang="ts">
export default {
    name: 'Setting'
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