// 导入 axios
import axios from "axios";
// 接口基准地址：
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

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
        headers:{
            Authorization:window.sessionStorage.getItem('token')
        }
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
