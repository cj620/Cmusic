import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //主页面
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
  },
  //歌单详情页面
  {
    path: '/songMenuDetail',
    component: () => import('@/views/SongMenu')
  },
  //歌曲播放界面
  {
    path: '/MusicPlayr',
    component: () => import('@/views/MusicPlayr')
  },
  //错误页面
  {
    path: '*',
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  base:"https://autumnfish.cn",
  routes
})

export default router
