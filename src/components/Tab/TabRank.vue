<template>
  <div>
<div class="top-bg">
  <div class="top-title"/>
</div>
<!-- <SongsList :song-list=songList /> -->
<div class="content">
  <ul v-if="songList.length != 0">
    <li v-for="(value,index) in songList"
    :key="value.id"
    class="music-list"
    @click="$router.push({ path: '/MusicPlayr', query: {id: value.id }})"
    >
    <div>{{index+1 | filtersSum}}</div>
    <div>
            <div class="news-txt-top">{{ value.al.name }}</div>
            <div class="news-txt-bottom">
              <div />
              <div>{{ value.ar[0].name }} - {{ value.al.name }}</div>
            </div>
    </div>
    <div class="news-icon">
      <van-icon name="play-circle-o"/>
    </div>
    </li>
  </ul>
  <div v-else class="tips">请等待数据加载</div>
</div>
  </div>
</template>

<script>
import SongsList from '../SongList/index'  //热歌列表不能使用Songlist，因为这里没有artists
import { getMusicTopList } from '@/api/api'
  export default {
    // components:{
    //   SongsList
    // },
    data() {
      return {
        songList:[],
      }
    },
    filters:{
      filtersSum(val){
        return val < 10? `0${val}`:val
      }
    },
    created(){
       // idx: 对象 key, 对应热歌榜
    const params = {
      id: 1
    }
      getMusicTopList(params).then(res=>{
        this.songList = res.playlist.tracks.slice(0,30)
        // console.log(res.playlist.tracks);
         this.$store.state.trackIds = res.playlist.tracks
        // console.log(this.songList[0])
        
      }
      )
    }
  }
</script>

<style lang="scss" scoped>
.top-bg {
  height: 146px;
  width: 100%;
  background-image: url(../../assets/hot_music_bg_2x.jpg);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-title {
  width: 142px;
  height: 67px;
  background-position: -24px -30px;
  background-image: url(../../assets/hot_icon.png);
  background-size: 166px 97px;
  transform: scale(1.5);
}
.top-time {
  margin-top: 10px;
  color: #fff;
}
.content {
  ul {
    li {
      display: flex;
      position: relative;
      height: 60px;
      border-bottom: 1px solid #ccc;
      padding-right: 50px;
      > div:nth-of-type(1) {
        width: 40px;
        line-height: 60px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color: #999;
      }

      > div:nth-of-type(2) {
        padding-top: 8px;
        .news-txt-top {
          font-size: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
          color: #000;
          padding-bottom: 2px;
        }
        .news-txt-bottom {
          display: flex;
          align-items: center;
          > div:nth-of-type(1) {
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-right: 4px;
            background: url("../../assets/hot_icon.png") no-repeat;
            background-size: 166px 97px;
          }
          > div:nth-of-type(2) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
          }
        }
      }
      > div:nth-of-type(3) {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translate(0, -50%);
        > i {
          font-size: 30px;
          color: #ccc;
        }
      }
    }
    li:nth-child(-n+3) {
      >div:nth-of-type(1) {
        color: #0e02be;
      }
    }
  }
  .tips {
    padding-top: 100px;
    text-align: center;
  }
}
</style>