import axios from "axios"
import store from '@/store'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
axios.defaults.baseURL = 'http://www.liulongbin.top:8000'

//请求拦截器
axios.interceptors.request.use(function (config) {
    // 请求发起之后
    // config配置对象 
    const { user } = store.state
    if( user && user.token ){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    //要返回config对象，否则请求出不去
    return config;
  }, function (error) {
    // 请求出错 还没发出去
    return Promise.reject(error);
  });

//返回拦截器



export default axios