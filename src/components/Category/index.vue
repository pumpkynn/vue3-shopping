<template>
  <div>
    <el-card style="margin: 10px 0 ; width: 98%;"  >
      <!-- 分类选择区域 -->
      <el-form class="category-form-row" style="margin-bottom: 16px;">
        <el-form-item label="一级分类" class="category-form-item" :disabled="scene == 0?true:false">
          <el-select placeholder="请选择" style="width: 100%" v-model="c1Id" @change="handler">
            <el-option v-for="c1 in categoryStore.c1arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" class="category-form-item" :disabled="scene == 0?true:false">
          <el-select placeholder="请选择" style="width: 100%" v-model="c2Id" @change="handler2">
            <el-option v-for="c2 in categoryStore.c2arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
           
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" class="category-form-item" :disabled="scene == 0?true:false">
          <el-select placeholder="请选择" style="width: 100%" v-model="categoryStore.c3Id">
            <el-option v-for="c3 in categoryStore.c3arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
           
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
       </el-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { defineProps } from 'vue'
import { useCategoryStore } from '../../store/modules/category'
const categoryStore = useCategoryStore()
const c1Id = ref<number | string>('')
const c2Id = ref<number | string>('')
// 移除c3Id本地变量
onMounted(() => {
  categoryStore.getC1()
})
// 一级分类select事件，选中时赋值并请求二级分类
const handler = (val: number | string) => {
  c1Id.value = val
  categoryStore.c1Id = val
  categoryStore.c2Id = ''
  c2Id.value = ''
  categoryStore.c2arr = []
  categoryStore.c3Id = ''
  categoryStore.c3arr = []
  categoryStore.getC2()
}
// 二级分类select事件，选中时赋值并请求三级分类
const handler2 = (val: number | string) => {
  c2Id.value = val
  categoryStore.c2Id = val
  categoryStore.c3Id = ''
  categoryStore.c3arr = []
  categoryStore.getC3()
}
defineProps<{
  scene: number
}>()
</script>

<style scoped lang="scss">
.category-form-row {
  display: flex;
  justify-content: space-between;
}
.category-form-item {
  flex: 1 1 0;
  margin-right: 0 !important;
  &:not(:last-child) {
    margin-right: 16px !important;
  }
}

</style>