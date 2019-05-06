import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 整合elmui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入路由
import router from "./router"
new Vue({
  render: h => h(App),
  // 挂在vue上面
  router
}).$mount('#app')
