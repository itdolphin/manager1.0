
// 导入组件
// 导入路由
import Vue from 'vue'
import VueRouter from "vue-router";
// 导入vue去use router
Vue.use(VueRouter)

// 导入index各个view页面
import login from "./components/login.vue"
import index from "./components/index.vue"
import users from "./components/users.vue"
import roles from "./components/roles.vue"
import rights from "./components/rights.vue"
import goods from "./components/goods.vue"
import params from "./components/params.vue"
import categories from "./components/categories.vue"
import orders from "./components/orders.vue"
import reports from "./components/reports.vue"
// 写路由规则
const routes=[
    {path:'/login',component:login},   
    {path:'/',component:index,
    children:[
        {path:'',redirect:'users'},
        {path:'users',component:users},
        {path:'roles',component:roles},
        {path:'rights',component:rights},
        {path:'goods',component:goods},
        {path:'params',component:params},
        {path:'categories',component:categories},
        {path:'orders',component:orders},
        {path:'reports',component:reports},
    ]
}, 
]
// 实例化路由
const router=new VueRouter({
    routes
})
// 暴露路由
export default router