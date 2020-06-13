<template>
  <div>
<div class="top-bg">
  <div class="top-title"/>
</div>
<!-- <SongsList :song-list=songList /> -->
  </div>
</template>

<script>
import SongsList from '../SongList/index'
import { getMusicTopList } from '@/api/api'
  export default {
    components:{
      SongsList
    },
    data() {
      return {
        songList:[]
      }
    },
    created(){
       // idx: 对象 key, 对应热歌榜
    const params = {
      idx: 1
    }
      getMusicTopList(params).then(res=>{
        this.songList = res.playlist.tracks
      }
      )
    }
  }
</script>

<style lang="scss" scoped>
.top-bg{
  height: 146px;
  width: 100%;
  background-image: url(../../assets/hot_music_bg_2x.jpg);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .top-title {
  width: 142px;
  height: 67px;
  background-position: -24px -30px;
  background-image: url(../../assets/hot_icon.png);
  background-size: 166px 97px;
  transform: scale(1.5);
}
}
</style>