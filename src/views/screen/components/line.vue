<template>
  <div class="lineBox">
    <div class="title">
      <p>未来7天游客趋势图</p>
      <img
        src="../images/dataScreen-title.png"
        alt=""
        style="margin-bottom: 7px"
      />
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
      title: {
        text: '访问量',
        textStyle: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
          color: '#4ecdc4',
          fontSize: 10,
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
        type: 'value',
        axisLabel: {
          color: '#4ecdc4',
          fontSize: 10,
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
      grid: {
        left: '10%',
        right: '10%',
        top: '15%',
        bottom: '15%',
      },
      series: [
        {
          type: 'line',
          data: [120, 200, 150, 80, 70, 110, 130],
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(78, 205, 196, 0.8)' },
                { offset: 1, color: 'rgba(78, 205, 196, 0.1)' },
              ],
            },
          },
          itemStyle: {
            color: '#4ecdc4',
            borderWidth: 2,
            borderColor: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(78, 205, 196, 0.5)',
          },
          emphasis: {
            itemStyle: {
              color: '#fff',
              shadowBlur: 15,
              shadowColor: 'rgba(78, 205, 196, 0.8)',
            },
          },
          lineStyle: {
            width: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(78, 205, 196, 0.5)',
          },
        },
      ],
    })
  }
})
</script>

<style lang="scss" scoped>
.lineBox {
  width: 100%;
  height: 100%;
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
  }
}
</style>
