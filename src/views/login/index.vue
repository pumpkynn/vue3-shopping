<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello World!</h1>
          <h2>欢迎使用</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '../../store/modules/user'
import { useRouter ,useRoute} from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '../../utils/time'
let $router = useRouter()
let $route = useRoute()
let useStore = useUserStore()
let loginForms = ref()
let loading = ref()
let loginForm = reactive({ username: 'admin', password: '111111' })
// 修正校验规则：只判断长度
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('账号长度5-10位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码长度5-10位'))
  }
}
const rules = {
  username: [{ trigger: 'change', validator: validatorUsername }],
  password: [{ trigger: 'change', validator: validatorPassword }],
}
const login = async () => {
  try {
    await loginForms.value.validate()
  } catch (err) {
    // 校验未通过，给出提示并阻止后续登录
    ElNotification({
      message: '请正确填写账号和密码',
      type: 'error',
    })
    return
  }
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    let redirect : any = $route.query.redirect
    $router.push({
      path: redirect || '/home',
    })
    ElNotification({
      title: `HI,${getTime()}好`,
      message: '欢迎回来',
      type: 'success',
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    ElNotification({
      message: (error as Error).message,
      type: 'error',
    })
  }
}
</script>
<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login-form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: #fff;
    font-size: 40px;
  }
  h2 {
    margin: 20px 0;
    color: #fff;
    font-size: 20px;
  }
  .login-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
