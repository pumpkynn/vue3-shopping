<template>
<div class="container">
  <div class="screen" ref="screen"> 
    <Top />
     <div class="bottom">
      <div class="left">
        <Tourist  class="tourist"/>
        <Sex class="sex"/>
         <Age class="age"/>
      </div>
      <div class="center">
        <Map class="map"/>
        <Line class="line"></Line>
      </div>
      <div class="right">
        <Rank class="rank"></Rank>
        <Counter class="counter"></Counter>
        <Year class="year"></Year>
      </div>
     </div>
    </div>
</div>
</template>

<script lang="ts" setup name="Screen">
import { ref ,onMounted} from 'vue';
import Top from './components/top.vue'
import Age from './components/age.vue'
import Sex from './components/sex.vue'
import Tourist from './components/tourist.vue'
import Map from './components/map.vue'
import Line from './components/line.vue'
import Rank from './components/rank.vue'
import Counter from './components/counter.vue'
import Year from './components/year.vue'
const screen=ref()
onMounted(()=>{
  console.log('onMounted - screen.value:', screen.value);
  // 使用 setTimeout 确保 DOM 完全渲染
  setTimeout(() => {
    if (screen.value && screen.value.style) {
      screen.value.style.transform=`scale(${getScale()}) translate(-50%, -50%)`
      console.log('缩放设置成功');
    } else {
      console.error('screen.value 不存在或没有 style 属性');
    }
  }, 100);
})
function getScale(w = 1707, h = 898) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 监听视口的变化
window.onresize = () => {
  if (screen.value && screen.value.style) {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
}
</script>

<style lang="scss" scoped>
.container {
   position:fixed;
  width: 100vw;
  height: 100vh;
  background:url('./images/bg.png') no-repeat center center;
  background-size: cover;
  .screen {
     position:fixed;
    width: 1707px;
    height: 898px;
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    .top {
      width: 100%;
      height:50px;
      background: transparent;
    }
    .bottom{
      display: flex;
      height: 848px;
      gap: 20px;
      padding: 0 0 0 10px;
      .left{
        flex:0.8;
        height:848px;
        display: flex;
        background: transparent;
        flex-direction: column;
        gap: 15px;
        padding: 0;
        .tourist{
          flex:1;
          background: transparent;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          margin-top:0;
        }
        .sex{
          flex:1;
          margin-top:0;
          background: transparent;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }
        .age{
          flex:1;
          margin-top:0;
          background: transparent;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }
      }
      .center{  
        flex: 2; 
        display: flex;
        flex-direction: column;
        gap: 15px;
        .map{
          flex:1.8;
          background: transparent;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }
        .line{
          flex:1;
          background: transparent;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }
      }
      .right{
       flex:1;
       display:flex;
       flex-direction: column;
       gap: 15px;
       padding-right: 10px;
       .rank{
        flex:1;
        background: transparent;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        margin-top:0;
       }
       .counter{
        flex:1;
        background: transparent;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        margin-top:0;
       }
       .year{
        flex:1;
        background: transparent;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        margin-top:0;
       }
     }
   }
  }
}
</style>