
// 导入组件
import login from "./components/login.vue"
// 导入路由
 import VueRouter from "vue-router";
// 导入vue去use router
import Vue from 'vue'
Vue.use(VueRouter)

// 写路由规则
const routes=[
    {path:'/login',component:login}
]
// 实例化路由
const router=new VueRouter({
    routes
})
// 暴露路由
export default router