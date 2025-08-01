<template>
    <div>
        <router-view v-slot="{ Component }">
            <!-- 路由切换动画 -->
            <transition name="fade" mode="out-in">  
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>
    </div>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '../../store/modules/setting'
import { watch,ref,nextTick } from 'vue'
let LayOutSettingStore = useLayOutSettingStore()

let flag = ref(true)
watch(()=>LayOutSettingStore.refresh,()=>{
    flag.value = false
    nextTick(()=>{
        flag.value = true
    })
})
</script>
<script lang="ts">
export default {
    name: 'Main'
}
</script>
<style scoped lang="scss">
.fade-enter-from{
    opacity: 0;
    
}
.fade-enter-active{
    transition: opacity 0.5s ease;
}
.fade-enter-to{
    opacity: 1;
}
</style>  