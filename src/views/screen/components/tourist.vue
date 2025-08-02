<template>
<div class="box">
<div class="top">
    <div class="left">
     <p class="title">实时游客统计</p>
     <p class="bg"></p> 
     <p class="right">可预约人数：<span>1000</span>人</p>
    </div>
</div>
<div class="num" >
    <span v-for="(item,index) in people" :key="index">{{ item }}</span>
</div>
<div class="echarts" ref="charts"></div>
</div>
</template>

<script lang="ts" setup>
import { ref ,onMounted} from 'vue';
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const people=ref('216908人')
const charts = ref()
onMounted(()=>{
   if (charts.value) {
     const myChart=echarts.init(charts.value)
     myChart.setOption({
      title:{
        text:''
      },
      xAxis:{
      },
      yAxis:{
        
      },
      series:{
        type:"liquidFill",
        data:[0.6,0.4,0.2],
        waveAnimation: true,
        animationDuration: 3,
        animationDurationUpdate: 0,
        radius: '70%',
        center: ['50%', '50%'],
        label: {
          show: true,
          fontSize: 14,
          color: '#fff',
          fontWeight: 'bold'
        },
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#4ecdc4',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(78, 205, 196, 0.5)',
          },
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              {offset: 0, color: '#4ecdc4'},
              {offset: 0.5, color: '#44a08d'},
              {offset: 1, color: '#2c7a7b'}
            ]
          }
        }
      },
      grid:{
        left:'0',
        right:'0',
        top:'0',
        bottom:'0'
      }
     })
   }
})
</script>

<style lang="scss" scoped>
.box{
   background: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .top{
      margin-left:20px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
      .left{
       float:left;
      }
   .title{
       color:white;
       font-size: 16px;
       text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    
   }
   .bg{
       width:68px;
       height:7px;
       background: url('../images/dataScreen-title.png') no-repeat;
       background-size: 100% 100%;
   
   }
   .right{
       color:white;
       font-size: 16px;
     margin-right: 30px;
     color:white;
       float:right;
       margin-top:-60px;
       margin-left:200px;
       span{
           color:aqua
       }
   }
  }
  .num{
  display: flex;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  span{
   flex:1;
   height:30px;
   text-align: center;
   line-height: 30px;
   margin:0 5px;
   background:url('../images/total.png') no-repeat;
   background-size: 100% 100%;
   color:#29fcff;
  }
  }
  .echarts{
   width:100%;
   flex:1;
   background: transparent;
   color:white;
   position: relative;
   z-index: 1;
  }
}
</style>


