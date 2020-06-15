const mutations = {
  setRemdList(state,remdList){
    state.remdList = remdList.slice(0,6)
  },
  setNewSongList(state,newSongList){
    state.newSongList = newSongList
  }
}
export default mutations