/**
 * 主页相关请求模块
 */
 import request from '@/utils/request'

 export const getUserChannels = () => {
   return request({
     method: 'GET',
     url: '/v1_0/user/channels',
   })
 }

//获取文章接口
 export const getArticles = (params) => {
    return request({
      method: 'GET',
      url: '/v1_0/articles',
      params
    })
  }