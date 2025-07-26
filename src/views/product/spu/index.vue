<template>
  <div >
   <Category :scene="scene"></Category>
<el-card style="margin: 10px 0;width:98%">
  <div v-show="scene === 0">
    <el-button @click="addSpu" type="primary" :icon="Plus" size="default" :disabled="!categoryStore.c3Id">添加SPU</el-button>
  <el-table border style="margin: 10px 0;" :data="records">
<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
<el-table-column label="SPU名称" prop="spuName"></el-table-column>
<el-table-column label="SPU描述" prop="description"></el-table-column>
<el-table-column label="操作" >
  <template #default="{row }">
<el-button type="primary" :icon="Plus" size="small" title="添加SKU"></el-button>
<el-button type="warning" :icon="Edit" size="small" @click="updateSpu(row)" title="修改SPU"></el-button>
<el-button type="info" :icon="View" size="small"  title="查看SPU"></el-button>
<el-button type="danger" :icon="Delete" size="small"  title="删除SPU"></el-button>
  </template>
</el-table-column>
 
  </el-table>
   <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7,9]"
      :background="true"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="getHasSpu"
      @size-change="changeSize"
    />
  </div>
  <!-- 添加SPU的子组件 -->
  <SpuForm v-show="scene === 1" @changeScene="changeScene"></SpuForm>


  <!-- 添加SKU的子组件 -->
  <SkuForm v-show="scene === 2"></SkuForm>
  </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref,watch } from 'vue'
import { Plus,Edit,Delete,View } from '@element-plus/icons-vue'
import { useCategoryStore } from '../../../store/modules/category'
import { reqHasSpu } from '../../../api/product/spu'
import type { HasSpuResponseData,Records } from '../../../api/product/spu/type'
import SkuForm from './skuForm.vue'
const categoryStore = useCategoryStore()
const scene = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
//存储已有的SPU数据s
const records = ref<Records>([])
//监听三级分类的id的变化
const total = ref<number>(0)
const $emit = defineEmits(['changeScene'])
watch (() =>categoryStore.c3Id,async()=>{
  //保证页面刚加载时，categoryStore.c3Id有值
  if(categoryStore.c3Id){
    getHasSpu()
  }
})
//此方法执行可以获取某一个三级分类下的SPU数据
const getHasSpu = async (pager = 1) => {
  currentPage.value = pager
  const res :HasSpuResponseData = await reqHasSpu(currentPage.value,pageSize.value,categoryStore.c3Id)
  if(res.code == 200){
    records.value = res.data.records
    total.value = res.data.total
  }
}
//修改每页条数
const changeSize = (size:number) => {
  pageSize.value = size
  getHasSpu()
}
//添加SPU
const addSpu = () => {
  scene.value = 1
}
//修改场景
const changeScene = (num:number) => {
  scene.value = num
}
//修改SPU
const updateSpu = (row:any) => {
  scene.value = 1
}
</script>
<style scoped lang="scss"></style>
