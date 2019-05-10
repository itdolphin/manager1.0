// 导入 axios
import axios from "axios";
// 接口基准地址：
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
// 导入vue
import Vue from 'vue'
// 增加一个axios请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 增加一个axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.data.meta.status==200){
    // new Vue().$message.success(response.data.meta.msg);
    Vue.prototype.$message.success(response.data.meta.msg);
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
  }


};



// 暴露出去 install方法的对象
export default {
  install(Vue) {
    //  添加到Vue原型上
    Vue.prototype.$request = request;
  }
};
