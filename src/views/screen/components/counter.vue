
<template>
<div class="counterBox">
<div class="title">
    <p>实时数据统计</p>
    <img src="../images/dataScreen-title.png" alt="">
</div>
<div class="data-container">
    <div class="data-item" v-for="(item, index) in dataItems" :key="index">
        <div class="icon">{{ item.icon }}</div>
        <div class="content">
            <div class="number">{{ item.value }}</div>
            <div class="label">{{ item.label }}</div>
        </div>
        <div class="trend" :class="item.trend">{{ item.trend === 'up' ? '↗' : '↘' }}</div>
    </div>
</div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const dataItems = ref([
    { value: 0, label: '今日游客', icon: '👥', trend: 'up' },
    { value: 0, label: '总收入(万)', icon: '💰', trend: 'up' },
    { value: 0, label: '满意度(%)', icon: '❤️', trend: 'up' }
])

let timer: number | null = null

const updateData = () => {
    dataItems.value[0].value = Math.floor(Math.random() * 5000) + 8000
    dataItems.value[1].value = Math.floor(Math.random() * 200) + 300
    dataItems.value[2].value = Math.floor(Math.random() * 20) + 80
    
    // 随机改变趋势
    dataItems.value.forEach(item => {
        item.trend = Math.random() > 0.5 ? 'up' : 'down'
    })
}

onMounted(() => {
    updateData()
    timer = setInterval(updateData, 3000)
})

onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})
</script>

<style lang="scss" scoped>
.counterBox{
    width:97%;
    height:95%;
    background: transparent;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(68, 160, 141, 0.05) 100%);
        pointer-events: none;
    }
    .title{
        margin-top:-10px;
        margin-left:20px;
        position: relative;
        z-index: 1;
       p{
        color:white;
        font-size: 15px;
        margin-bottom: 0px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
       } 
       img{
        margin-top:-180px;  
       }
    }
    .data-container{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 15px;
        position: relative;
        z-index: 1;
        
        .data-item{
            display: flex;
            align-items: center;
            padding: 5px 5px;
            background: transparent;
            border: 1px solid rgba(78, 205, 196, 0.2);
            border-radius: 8px;
            margin: 4px 0;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
                transition: left 0.5s ease;
            }
            
            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(78, 205, 196, 0.2);
                border-color: rgba(78, 205, 196, 0.4);
                
                &::before {
                    left: 100%;
                }
            }
            
            .icon {
                font-size: 18px;
                margin-right: 12px;
                filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
            }
            
            .content {
                flex: 1;
                
                .number{
                    color: #4ecdc4;
                    font-size: 20px;
                    font-weight: bold;
                    text-shadow: 0 0 8px rgba(78, 205, 196, 0.5);
                    margin-bottom: 2px;
                }
                
                .label{
                    color: #fff;
                    font-size: 11px;
                    opacity: 0.2;
                }
            }
            
            .trend {
                font-size: 14px;
                font-weight: bold;
                margin-left: 8px;
                
                &.up {
                    color: #4ecdc4;
                    text-shadow: 0 0 6px rgba(78, 205, 196, 0.5);
                }
                
                &.down {
                    color: #ff4757;
                    text-shadow: 0 0 6px rgba(255, 71, 87, 0.5);
                }
            }
        }
    }
}
</style>


