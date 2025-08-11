<template>
  <div class="ageBox">
    <div class="title">
      <p>年龄比例</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="agecharts" ref="charts"></div>
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
      title: {
        text: '年龄分布',
        left: 'center',
        top: 10,
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: '10%',
        top: 'middle',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              color: '#fff',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: '18-25岁', itemStyle: { color: '#4ecdc4' } },
            { value: 310, name: '26-35岁', itemStyle: { color: '#44a08d' } },
            { value: 234, name: '36-45岁', itemStyle: { color: '#2c7a7b' } },
            { value: 135, name: '46-55岁', itemStyle: { color: '#1a5f5f' } },
            { value: 148, name: '55岁以上', itemStyle: { color: '#0f4a4a' } },
          ],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
      ],
    })
  }
})
</script>
<style lang="scss" scoped>
.ageBox {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  position: relative;
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
  .agecharts {
    width: 100%;
    flex: 1;
    background: transparent;
    position: relative;
    z-index: 1;
  }
}
</style>
