
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
import error from "./components/error.vue"

// goods页面的子页面
import goodsAdd from './components/goodsAdd.vue'
import goodsList from './components/goodsList.vue'

// 写路由规则
const routes=[
    {path:'/login',component:login},   
    {path:'/',component:index,
    children:[
        {path:'',redirect:'users'},
        {path:'users',component:users},
        {path:'roles',component:roles},
        {path:'rights',component:rights},
        {path:'goods',component:goods,
        children:[
            {path:'add',component:goodsAdd}, //匹配的规则是:/goods/add
            {path:'',component:goodsList} //匹配的规则是:/goods/add
        ]
    },
        {path:'params',component:params},
        {path:'categories',component:categories},
        {path:'orders',component:orders},
        {path:'reports',component:reports},
        {path:'error',component:error},
    ]
}, 
]
// 实例化路由
const router=new VueRouter({
    routes,
    mode: 'history',
    // routes: [...]
})
// 路由前置钩子--导航守卫
router.beforeEach((to, from, next) => {
    // ...
    // next()
    if(to.matched.length==0){
        // 不存在
        next('error')
    } else{
        // 存在这个页面
        next()
    }
  })
// 暴露路由
export default router