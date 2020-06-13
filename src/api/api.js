//对请求地址和方法进行封装
//引入请求体
import request from '@/utils/request.js'
//获取推荐歌单
export function getRemdSongList(){
  return request({
    url:'/personalized'
  })
}
//获取最新歌曲
export function getNewSongList(){
  return request({
    url:'/personalized/newsong'
  })
}