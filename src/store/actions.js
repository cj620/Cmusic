import {getRemdSongList} from '@/api/api'
const actions = {
  //推荐歌单
  getRemdSongList({ commit }) {
    return new Promise((resolve, reject) => {
      getRemdSongList().then(res => {
        console.log('推荐歌单数据', res);
        if (res.code === 200) {
          commit('setRemdList', res.result);
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}