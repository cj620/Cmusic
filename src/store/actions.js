import {getRemdSongList,getNewSongList} from '@/api/api'
const actions = {
  //推荐歌单
  getRemdSongList(context) {
    return new Promise((resolve) =>{
      getRemdSongList().then(res =>{
        // console.log('推荐',res);
        if(res.code ===200){
          context.commit('setRemdList',res.result)
          resolve()
        }
      })
    })
  },
  getNewSongList(context){
    return new Promise(resolve =>{
      getNewSongList().then(res =>{
        if(res.code === 200){
          context.commit('setNewSongList',res.result)
          resolve()
        }
      })
    })
  }
}
export default actions