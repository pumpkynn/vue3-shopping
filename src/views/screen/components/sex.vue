<template>
  <div class="ageBox">
    <div class="title">
      <p>性别比例</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate"></div>
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
      title: {},
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: 'category',
      },
      series: [
        {
          type: 'bar',
          data: [50],
          color: '#4ecdc4',
          barWidth: 20,
          z: 100,
          label: {
            show: true,
            position: 'inside',
            formatter: '男士50%',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
          },
          itemStyle: {
            borderRadius: 10,
          },
        },
        {
          type: 'bar',
          data: [100],
          color: '#44a08d',
          barWidth: 20,
          barGap: '-100%',
          label: {
            show: true,
            position: 'inside',
            formatter: '女士50%',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            offset: [0, 0],
          },
          itemStyle: {
            borderRadius: 10,
          },
        },
      ],
      grid: {
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
      },
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
  .sex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    z-index: 1;
    .man {
      width: 111px;
      height: 115px;
      margin: 25px;
      background: url('../images/man-bg.png') no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .woman {
      width: 111px;
      height: 115px;
      margin: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('../images/woman-bg.png') no-repeat;
    }
  }
  .rate {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
    p {
      color: white;
      font-size: 15px;
    }
  }
  .charts {
    flex: 1;
    margin-top: -30px;
    position: relative;
    z-index: 1;
  }
}
</style>
