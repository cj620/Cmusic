<template>
  <div>
    <div class="rec">
      <div class="rec-title">
        <div>
          推荐歌单
        </div>
      </div>
 <!-- 歌单列表 -->
      <div class="rec-content">
        <ul>

          <li v-for="value in $store.getters.remdList" 
              :key="value.id"
               @click="$router.push({path:'/songMenuDetail',query:{id:value.id}})">

            <div class="remd-li">
              <img :src="value.picUrl" :alt="value.name">
              <span>
                <van-icon name="play-circle-o" />
                {{(value.playCount / 10000).toFixed() }}万
              </span>
            </div>
            <div class="remd-text">{{value.name}}</div>

          </li>
        </ul>
      </div>
    </div>
 <!-- 最新音乐 -->
    <div class="news-music">
      <div class="news-music-title">
        <div>
          最新音乐
        </div>
      </div>
      <SongsList :song-list="songList" />
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import SongsList from '../SongList/index'  
import {getRemdSongList,getNewSongList} from '@/api/api'
  export default {
    components:{
      SongsList
    },
    data() {
      return {
        remdList:[],
        songList:[]
      }
    },
    mounted(){
      this.$store.dispatch('getRemdSongList')
      .then(() => {
        Toast.clear();
      })
      .catch(() => {
        Toast.loading({
          duration: 0,
          // 持续展示 toast
          forbidClick: true,
          // 禁用背景点击
          loadingType: 'spinner'
        });
      })
      this.$store.dispatch('getNewSongList')
      .then(() => {
        Toast.clear();
      })
      .catch(() => {
        Toast.loading({
          duration: 0,
          // 持续展示 toast
          forbidClick: true,
          // 禁用背景点击
          loadingType: 'spinner'
        }); 
      })
      // console.log(this.$store.state.remdList);
      // this.remdList = this.$store.state.remdList  //传入组件
      
      getNewSongList().then(res =>{
        this.songList = res.result
        
      })
      
    }
  }
</script>

<style lang="scss" scoped>
.rec{
  .rec-title{
    padding: 20px 0;
    > div{
    height: 18px;
      line-height: 18px;
      border-left: 2px solid #c4483b;
      border-top: 2px solid transparent;
      padding-left: 10px;
      font-size: 16px;
  }
  }
  .rec-content {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 33.33%;
        padding: 0 2px;
        .remd-li {
          position: relative;
          img {
            border-radius: 6px;
            width: 100%;
          }
          > span {
            color: aliceblue;
            font-size: 12px;
            position: absolute;
            right: 4px;
            top: 2px;
            height: 20px;
            line-height: 20px;

            display: flex;
            > i {
              padding-right: 2px;
              display: block;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
}
.news-music {
  .news-music-title {
    padding: 20px 0;
    > div {
      height: 18px;
      line-height: 18px;
      border-left: 2px solid #c4483b;
      border-top: 2px solid transparent;
      padding-left: 10px;
      font-size: 16px;
    }
  }
}
</style>