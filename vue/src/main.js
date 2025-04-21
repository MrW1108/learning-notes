import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')


// 添加 HMR 处理
if (import.meta.hot) {
  console.log(__VUE_HMR_RUNTIME__)
  import.meta.hot.accept()
} 