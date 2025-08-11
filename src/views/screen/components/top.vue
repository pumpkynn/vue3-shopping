<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'
const $router = useRouter()
const time = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
const timer = ref(0)
const goHome = () => {
  $router.push({ path: '/home' })
}
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 HH时mm分ss秒')
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 50px;
  display: flex;
  background: transparent;
  padding: 0 0 0 10px;
  .left {
    flex: 0.8;
    background: transparent;
    .lbtn {
      width: 150px;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      height: 50px;
      float: right;
      background-size: 100% 100%;
      cursor: pointer;
      text-align: center;
      line-height: 50px;
      color: #29fcff;
    }
  }
  .center {
    flex: 2;
    background: transparent;

    .title {
      width: 100%;
      height: 50px;
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 50px;
      color: #29fcff;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .right {
    flex: 1;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    .rbtn {
      width: 150px;
      height: 50px;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      text-align: center;
      line-height: 50px;
      color: #29fcff;
      float: left;
    }
    .time {
      width: 200px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: #29fcff;
      float: left;
      font-size: 14px;
    }
  }
}
</style>
