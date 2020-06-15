<template>
  <div class="music-playr">
    <!-- 背景 -->
    <div
      ref="song-bg"
      class="song-bg"
      :style="{backgroundImage:`url(${songInfo.picUrl})`}"
    />
    <!-- 头部 -->
      <div class="song-head">
        <div class="song-title">
          {{songInfo.name}}
        </div>
      </div>
    <!-- 中部 -->
    <div class="song-mid">
      <div class="song-pic" @click="changeMid" v-show="lyricShow?false:true">
        <img :src="`${songInfo.picUrl}`" >
      </div>
<!-- 歌词显示 -->
    <div class="song-lrc" @click="changeMid" v-show="lyricShow?true:false">
      <div class="song-lyric">
        {{lyric}}
      </div>
    </div>

    </div>
    <!-- 底部 -->
    <div class="song-footer">
      <!-- <van-progress :percentage="50" inactive stroke-width="5"  /> -->
      <div class="song-ct">
      <div class="left">
        <van-icon name="play-circle-o" class="left1" size="70" color=""/>
      </div>
      <van-icon name="pause-circle-o" class="mid" size="70"/>
      <van-icon name="play-circle-o" class="right" size="70"/>
      </div>
    </div>

  
    <!-- <div class="song-set" @click="handleSong">
      <van-icon v-show="playBtnShow" name="play-circle-o" />
      <div ref="setSong" class="song-set-btn">
        <img :src="songInfo.picUrl" :alt="songInfo.name">
      </div>
    </div> -->
    <audio
      v-show="false"
      ref="setAudio"
      class="audio"
      :src="musicUrl"
      controls
      autoplay
    >您的浏览器太老了不支持audio 标签</audio>
  </div> 
</template>

<script>
import { getMusicDetail ,getMusicUrl,getMusicLyric} from '@/api/api'
  export default {
    data() {
      return {
        musicId: this.$route.query.id,  //当前点击的歌曲id
        musicUrl:'',
        playBtnShow: false,    //默认不显示
        songInfo: {
        picUrl: '',
        name: ''
       },
       lyricShow:false,
       lyric:""
      }
    },
    created(){
      this.init()
    },
    methods:{
      async init(){
      //  console.log(getAlbum(this.musicId));
      // console.log(getMusicUrl(this.musicId));
      await getMusicUrl(this.musicId).then(res=>this.musicUrl=res.data[0].url)  //得到歌曲地址
      await getMusicDetail(this.musicId).then(res => {
        this.songInfo = res.songs[0].al;
        // console.log(this.songInfo);
        // console.log(res);     
      })
      await getMusicLyric(this.musicId).then(res =>{
        this.lyric = res.lrc.lyric
      })
      }
      ,
      changeMid(){
        this.lyricShow = !this.lyricShow
      }

    // handleSong() {
    //   this.$nextTick(() => {
    //     if (this.$refs.setAudio.paused) {
    //       this.$refs.setSong.style.animationPlayState = 'running'
    //       this.playBtnShow = false
    //       this.$refs.setAudio.play()
    //     } else {
    //       this.$refs.setSong.style.animationPlayState = 'paused'
    //       this.playBtnShow = true
    //       this.$refs.setAudio.pause()
    //     }
    //   }

    //   );
    // }      
    }
  }
</script>

<style lang="scss" scoped>
.music-playr{
  font-size: 20px;
  .song-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: -50px;
    height: 100%;
    background-color: #161824;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transform-origin: center top;
    transform: scale(1.5);
    transition: opacity 0.3s linear;
    z-index: -1;
    filter: blur(16px);
  }
  // 头部
  .song-head{
    position: fixed;
    top: 7%;
    left: 50%;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    transform: translate(-50%, -50%);
    .song-title{
      font-size: 130%;
    }
  }
  //中部
  .song-mid{
    position: fixed;
    top: 45%;
    left: 50%;
    height: 60%;
    width: 100%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    .song-pic{
      padding-left: 25%;
      > img{
        width: 70%;
        height: 50%;
        border-radius: 50%;
        animation: pop 4s infinite linear;
      }
      @keyframes pop {
      0% {
        transform: rotate(0deg) scale(1);
      }
      50%{
        transform: rotate(180deg) scale(1);
      }
      100% {
        transform: rotate(360deg) scale(1);
      }
    }
    }

    .song-lrc{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .song-lyric{
        color: white;
        flex-wrap: wrap;
      }
    }
  }
  //尾部
  .song-footer{
    position: fixed;
    bottom: 0;
    // background-color: pink;
    width: 100%;
    height: 33.3%;
    .song-ct{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 90%;
      height: 100%;
      display: flex;
      // background-color: pink; 
      align-items: center;
      padding-left: 10%;
      .left1{
        transform: rotate(180deg);
      }
      .left,.mid,.right{
        flex: 1;
      }
    }
  }

}

// .music-playr {
//   .song-bg {
//     position: fixed;
//     left: 0;
//     right: 0;
//     top: -50px;
//     height: 100%;
//     background-color: #161824;
//     background-position: 50%;
//     background-repeat: no-repeat;
//     background-size: auto 100%;
//     transform-origin: center top;
//     transform: scale(1.5);
//     transition: opacity 0.3s linear;
//     z-index: -1;
//     filter: blur(16px);
//   }
//   .song-set {
//     position: fixed;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, -50%);
//     i {
//       position: absolute;
//       top: 50%;
//       font-size: 1.33333rem;
//       z-index: 1;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       color: #fff;
//     }
//     .song-set-btn {
//       animation: circle 3s infinite linear;
//       img {
//         display: block;
//         margin: 0px auto;
//         width: 200px;
//         border-radius: 50%;
//       }
//     }
//     @keyframes circle {
//       0% {
//         transform: rotate(0deg);
//       }
//       100% {
//         transform: rotate(360deg);
//       }
//     }
//   }
// }
</style>