<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :background="background"
      :layout="layout"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface PaginationProps {
  total: number
  currentPage?: number
  pageSize?: number
  pageSizes?: number[]
  background?: boolean
  layout?: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 30, 40],
  background: true,
  layout: 'prev, pager, next, jumper, ->, sizes, total'
})

const emit = defineEmits<{
  'current-change': [page: number]
  'size-change': [size: number]
}>()

const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)

// 监听props变化
watch(() => props.currentPage, (newVal) => {
  currentPage.value = newVal
})

watch(() => props.pageSize, (newVal) => {
  pageSize.value = newVal
})

// 处理页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  emit('current-change', page)
}

// 处理每页条数变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  emit('size-change', size)
}
</script>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>
