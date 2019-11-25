/*
* 封装axios
* */

import axios from 'axios';
import {message} from 'antd';
import store from '../redux/store';
import codeMsg from '../config/codeMsg';
import {removeItem} from "../utils/storage";
import history from '../utils/history';
import {removeUserSuccess} from "../redux/action-creators/user";

const axiosInstance = axios.create({
  // http://47.103.203.152
  // http://localhost:5000
  baseURL: 'http://47.103.203.152/api',   // 公共的请求路径
  timeout: 10000,   // 请求超过10秒，中断请求
  headers:{
    // 公共的请求头参数
  }
});

// 拦截器

// 请求拦截器：在axios发送请求之前触发的拦截器回调
axiosInstance.interceptors.request.use(
  // 将要发送的请求是成功的(内部没有错)触发的回调
  (config) =>{
    console.log(config);
    if (config.method === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';

      config.data = Object.keys(config.data).reduce((prev, key) =>{
        const value = config.data[key];
        return prev + `&${key}=${value}`;
      },'').substring(1);
    }
    const {user:{token}} = store.getState();
    if (token) {
      config.headers.authorization = 'Bearer ' + token;
    }
    return config;
  },
  // 将要发送的请求是失败的(内部有错)触发的回调
  // () =>{
  //
  // }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  //  响应成功触发的回调函数
  //  响应成功，用户设置回调函数之前触发
  (response) =>{
    // console.log(response);
    // 响应成功
    if (response.data.status === 0) {
      return response.data.data;
    }else {
      // 响应失败
      // alert(response.data.msg);
      message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
  },
  // 响应失败触发的回调函数
  (error) =>{
    // console.dir(error);
    // console.log(error.response);

    let errMsg = '';
    if (error.response) {
      errMsg = codeMsg[error.response.status] || '未知错误';

      if (error.response.status === 401) {
        // 说明token 有问题
        // 清空本地token（localStorage、redux） 重定向到 /login
        // 一定先清空数据，在跳转
        removeItem();
        store.dispatch(removeUserSuccess());
        history.push('/login');
      }
    }else {
      if (error.message.indexOf('Network Error') !== -1) {
        errMsg = '请检查网络连接';
      }else if (error.message.indexOf('timeout') !== -1) {
        errMsg = '网络太卡了，请连上wifi重试';
      }else {
        errMsg = '未知错误';
      }
    }
    // alert(errMsg);
    message.error(errMsg);
    return Promise.reject(errMsg);
  }
);

export default axiosInstance;