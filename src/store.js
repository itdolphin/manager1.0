// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// use一下
Vue.use(Vuex)
// 实例化仓库
const store =new Vuex.Store({
    state:{
        // 菜单列表
        menusList:[]
    },
    mutations:{
        // 修改菜单列表的方法
        changeMenusList(state,newMenusList){
            state.menusList=newMenusList
             console.log(state.menusList);
        }
    }
})

// 暴露出去
export default store