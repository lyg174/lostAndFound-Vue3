import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import { createStore } from 'vuex'




const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 创建一个新的 store 实例
// const store = createStore({
//     state () {
//       return {
//         status: true
//       }
//     },
//     mutations: {
//       changeLogin (state) {
//         state.status = !state.status
//       }
//     }
//   })

app.use(router)
app.use(ElementPlus)

app.mount('#app')