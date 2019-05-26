// 导入 axios
import axios from "axios";
// 接口基准地址：
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
// 导入vue
import Vue from 'vue'
// 导入router
import router from "../router"
// import {Message} from 'element-ui'

// 增加一个  axios请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 增加一个  axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  //  console.log(response);
  if(response.data.meta.status==200){
    // new Vue().$message.success(response.data.meta.msg);
    Vue.prototype.$message.success(response.data.meta.msg);
    
    // Message.success()
  } else if(response.data.meta.status==400 && response.data.meta.msg=='无效token'){
    new Vue().$message.warning('F.B.I WARNNING---you are a badguy')
    router.push('login')
    window.sessionStorage.removeItem('token')
    // 避免看到无谓的错误 设置
    response.data.data=[]
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
// 抽取网络请求的对象
const request = {
  //   请求的地址 封装一层 自暴露参数
  // 方便后期维护
  login(params) {
    return axios.post('login',params)
  },
//   获取用户列表
  getUsers(params){
    return axios.get('users',{
      // get的数据需要这样写  
        params,
        // 用headers代token
        // headers:{
        //     Authorization:window.sessionStorage.getItem('token')
        // }
    })
  },
  // 修改用户状态
  changeUserState(params){
    return axios.put(`users/${params.id}/state/${params.type}`)
  },
  // 添加用户
  addUsers(params){
    return axios.post('users',params)
  },
  // 删除个别用户
  deleteUser(id){
    return axios.delete(`users/${id}`)
  },
  // 根据ID查询用户
  queryUserById(id){
    return axios.get(`users/${id}`)
  },
  // 编辑用户提交
  editUsers(params){
    return axios.put(`users/${params.id}`,{
      email:params.email,
      mobile:params.mobile
    })
  },
  // 角色列表
  rolesList(){
    return axios.get('roles')
  },
  // 修改个人角色
  updateRoles(params){
    // return axios.put(`users/${id}/${rid}`)
    return axios.put(`users/${params.id}/role`,{
      rid:params.rid
    })
  },
  // 添加角色
  addRole(params){
    return axios.post('roles',params)
  },
  // 删除角色
  deleteRole(id){
    return axios.delete(`roles/${id}`)
  },
  // 根据 ID 查询角色
  queryRoleById(id){
    return axios.get(`roles/${id}`)
  },
  // 编辑用户角色
  editRoles(params){
    // return axios.put(`roles/${params.id}`,{
    //   roleName:params.roleName,
    //   roleDesc:params.roleDesc
    // })
    return axios.put(`roles/${params.id}`,params)
  },
  // 所有列型权限列表
  rightsList(){
    return axios.get(`rights/list`)
  },
  // 数据报表统计
  dataReports(){
    return axios.get(`reports/type/1`)
  },
  // 获取所有订单
  getAllOrders(params){
    return axios.get('orders',{params})
  },
  // 删除角色指定权限
  deleteSpecRights(params){
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
  },
  // 所有树形权限获取
  treeRights(){
    return axios.get('rights/tree')
  },
  // 左侧菜单权限
  getMenusRights(){
    return axios.get('menus')
  },
  // 所有的商品数据
  getGoodsList(params){
    return axios.get('goods',{params})
  },
  // 商品种类列表
  goodsCategories(type){
    return axios.get(`categories?type=${type}`)
  },
  // 删除某个商品
  deleteSpecGoods(id){
    return axios.delete(`goods/${id}`)
  },
  // 编辑某个商品
  editSpecGoods(params){
    return axios.put(`goods/${params.id}`,params)
  },
  // 获取每个角色的权限

  // 为角色授权
  setRolesRights(params){
    return axios.post(`roles/${params.roleId}/rights`,{
      rids:params.rids
    })
  },
  // 获取所有商品
  getAllGoodsCate(){
    return axios.get('categories?type=3')
  },
  // 根据ID查询商品
  getSpecGoods(goodsId){
    return axios.get(`goods/${goodsId}`)
  },
  // 查询商品的动态参数
  dynamicGoodsParams(id){
    return axios.get(`categories/${id}/attributes?sel=many`)
  },
  // 查询商品的静态参数
  staticGoodsParams(id){
    return axios.get(`categories/${id}/attributes?sel=only`)
  }


};



// 暴露出去 install方法的对象
export default {
  install(Vue) {
    //  添加到Vue原型上
    Vue.prototype.$request = request;
  }
};
