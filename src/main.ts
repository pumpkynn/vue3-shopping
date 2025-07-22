import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import router from './router'
import gloablComponent from './components/index'
import pinia from './store/index'
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
    size: 'default',
})
app.use(gloablComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
