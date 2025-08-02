<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-image">
        <img src="../../assets/images/error_images/404.png" alt="404" />
      </div>
      <div class="error-info">
        <p class="error-message">抱歉，您访问的页面不存在</p>
        <p class="error-desc">页面可能已被删除、移动或暂时不可用</p>
        <div class="error-actions">
          <el-button type="primary" @click="goHome" size="large">
            <el-icon><House /></el-icon>
            返回首页
          </el-button>
          <el-button @click="goBack" size="large">
            <el-icon><ArrowLeft /></el-icon>
            返回上页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { House, ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.error-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f5f5f5;
  padding: 50px;
  
  .error-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    .error-image {
      margin-bottom: 30px;
      
      img {
        width: 400px;
        height: auto;
        max-width: 90%;
      }
    }
    
    .error-info {
      .error-message {
        font-size: 1.5rem;
        color: var(--el-text-color-primary);
        margin: 0 0 8px 0;
        font-weight: 500;
      }
      
      .error-desc {
        font-size: 1rem;
        color: var(--el-text-color-regular);
        margin: 0 0 30px 0;
        line-height: 1.5;
      }
      
      .error-actions {
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        
        .el-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 24px;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .error-container {
    padding: 30px;
    
    .error-content {
      .error-image img {
        width: 300px;
      }
      
      .error-info {
        .error-message {
          font-size: 1.2rem;
        }
        
        .error-actions {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
          
          .el-button {
            width: 200px;
          }
        }
      }
    }
  }
}
</style>
