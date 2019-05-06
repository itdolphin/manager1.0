
// 导入组件
// 导入路由
import Vue from 'vue'
import VueRouter from "vue-router";
// 导入vue去use router
Vue.use(VueRouter)

import login from "./components/login.vue"
import index from "./components/index.vue"
import users from "./components/users.vue"
// 写路由规则
const routes=[
    {path:'/login',component:login},   
    {path:'/',component:index,
    children:[
        {path:'users',component:users}
    ]
}, 
]
// 实例化路由
const router=new VueRouter({
    routes
})
// 暴露路由
export default router