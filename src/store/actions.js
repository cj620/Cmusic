import {getRemdSongList} from '@/api/api'
const actions = {
  //推荐歌单
  getRemdSongList(context) {
    return new Promise((resolve) =>{
      getRemdSongList().then(res =>{
        console.log('推荐',res);
        if(res.code ===200){
          context.commit('setRemdList',res.result)
          resolve()
        }
      })
    })
  }
}
export default actions