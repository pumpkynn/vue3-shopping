<template>
  <div ref="map" style="width: 100%; height: 100%;"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref,onMounted } from 'vue'
import china from './china.json'  
const map =ref()  
echarts.registerMap('china',china as any)
onMounted(()=>{
    if (map.value) {
        const myChart=echarts.init(map.value)
        myChart.setOption({
          geo:{
            map:'china',
            roam:false,
            zoom:1.2,
            label:{
              show:true,
              color: '#fff',
              fontSize: 10,
              fontWeight: 'bold',
              textShadow: '0 0 3px rgba(0, 0, 0, 0.8)'
            },
            itemStyle:{
              areaColor:'#fff',
              opacity:0.2 ,
              borderColor:'#000',
              borderWidth:0.5,
        
            }
          }
        })
    }
})
</script>
<style lang="scss" scoped>

</style>