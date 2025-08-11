<template>
  <div class="browser-size-debug">
    <h3>浏览器尺寸信息</h3>
    <div class="size-info">
      <p>
        <strong>视口尺寸:</strong>
        {{ viewportWidth }} x {{ viewportHeight }}
      </p>
      <p>
        <strong>屏幕尺寸:</strong>
        {{ screenWidth }} x {{ screenHeight }}
      </p>
      <p>
        <strong>文档尺寸:</strong>
        {{ documentWidth }} x {{ documentHeight }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const viewportWidth = ref(0)
const viewportHeight = ref(0)
const screenWidth = ref(0)
const screenHeight = ref(0)
const documentWidth = ref(0)
const documentHeight = ref(0)

const updateSize = () => {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
  screenWidth.value = screen.width
  screenHeight.value = screen.height
  documentWidth.value = document.documentElement.clientWidth
  documentHeight.value = document.documentElement.clientHeight
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})
</script>

<style scoped>
.browser-size-debug {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 5px;
  font-family: monospace;
  z-index: 9999;
  min-width: 200px;
}

.size-info p {
  margin: 5px 0;
  font-size: 12px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
}
</style>
