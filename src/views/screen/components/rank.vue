<template>
  <div class="rankBox">
    <div class="title">
      <p>热门景点排行榜</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const charts = ref()
onMounted(() => {
  if (charts.value) {
    const myChart = echarts.init(charts.value)
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}万人次',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#4ecdc4',
        borderWidth: 2,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        extraCssText: 'box-shadow: 0 0 10px rgba(78, 205, 196, 0.5);',
      },
      grid: {
        left: '25%',
        right: '10%',
        top: '20%',
        bottom: '20%',
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: '#4ecdc4',
          fontSize: 9,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(78, 205, 196, 0.3)',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(78, 205, 196, 0.1)',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: ['故宫博物院', '长城', '西湖', '黄山', '张家界'],
        axisLabel: {
          color: '#fff',
          fontSize: 9,
          fontWeight: 'bold',
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
      series: [
        {
          type: 'bar',
          data: [120, 98, 85, 72, 65],
          barWidth: 10,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#4ecdc4' },
                { offset: 0.5, color: '#44a08d' },
                { offset: 1, color: '#2c7a7b' },
              ],
            },
            borderRadius: [0, 6, 6, 0],
            shadowBlur: 8,
            shadowColor: 'rgba(78, 205, 196, 0.5)',
          },
          label: {
            show: true,
            position: 'right',
            color: '#fff',
            fontSize: 9,
            fontWeight: 'bold',
            formatter: '{c}万',
            textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowColor: 'rgba(78, 205, 196, 0.8)',
            },
          },
        },
      ],
    })
  }
})
</script>

<style lang="scss" scoped>
.rankBox {
  width: 97%;
  height: 95%;
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
    background: linear-gradient(
      135deg,
      rgba(78, 205, 196, 0.05) 0%,
      rgba(68, 160, 141, 0.02) 100%
    );
    pointer-events: none;
  }
  .title {
    margin-top: -10px;
    margin-left: 20px;
    position: relative;
    z-index: 1;
    p {
      color: white;
      font-size: 15px;
      margin-bottom: 0px;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    img {
      margin-top: -180px;
    }
  }
  .charts {
    flex: 1;
    width: 100%;
    position: relative;
    z-index: 1;
    padding: 5px;
  }
}
</style>
