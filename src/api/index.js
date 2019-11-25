/*
* 定义请求方法
* */

import axiosInstance from './request';

// 请求登录
export const reqLogin = (username,password) =>{
  return axiosInstance({
    method: 'POST',
    url: '/login',
    data: {
      username,
      password
    },
  })
};

// 请求分类列表
export const reqGetCategories = () =>{
  return axiosInstance({
    method: 'GET',
    url: '/category/get'
  })
};