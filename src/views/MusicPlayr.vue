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
      <div class="song-lyric" v-if="currentLyric">
        <!-- {{currentLyric}} -->

  <div class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">  
  <div>  
    <div class="lyric">  
      <p v-for="(line,index) in currentLyric.lines" ref="lyricLine"  :key="index"  
         class="text">{{line.txt}}</p>  
    </div>  
  </div>  
</div> 




      </div>
      <div class="no-lyric" v-else>没有找到歌词</div>
    </div>

    </div>
    <!-- 底部 -->
    <div class="song-footer">
      <!-- <van-progress :percentage="50" inactive stroke-width="5"  /> -->
      <div class="song-ct">
      <!-- <van-icon name="play-circle-o" class="play" size="70" color="white" @click="playBtn" v-if="play"/> -->
      <van-icon name="arrow-left" class="left" size="70" color="white"/>
      <van-icon name="circle" class="mid" size="70" color="white" @click="playBtn" ref="setSong" v-show="!playBtnShow"/>
      <van-icon name="arrow" class="right" size="70" color="white"/>
    <!-- <div class="left"></div>
    <div class="mid"></div>
    <div class="right"></div> -->



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
import Lyric from 'lyric-parser'
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
       lyric:'',
       currentLyric:'',
       currentLineNum:''
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
        // this.currentLyric = new Lyric(lyric, this.handleLyric)
        this.currentLyric = new Lyric(this.lyric, this.handleLyric)
        console.log(new Lyric(this.lyric, this.handleLyric));
        
      })
      }
      ,
      changeMid(){
        this.lyricShow = !this.lyricShow
      },
      playBtn(){
        if (this.$refs.setAudio.paused) {
          this.$refs.setAudio.play()
        } else {
          this.$refs.setAudio.pause()
        }
        
      },
      // 歌词处理
      handleLyric({lineNum, txt}) {
        console.log("----");
        
      // 回调事件包含两个参数 lineNum，当前play()事件的歌词索引，以及歌词文本 
	     this.currentLineNum = lineNum
	   // 调用scrollToElement方法，让其跳转当前行数-5的位置，时刻保持歌词居中显示
	     if (lineNum > 5) {
	     let lineEl = this.$refs.lyricLine[lineNum - 5]
	     this.$refs.lyricList.scrollToElement(lineEl, 1000)
	   } else {
	     this.$refs.lyricList.scrollTo(0, 0, 1000)
	   }
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
        transform: rotate(180deg) scale(1.3);
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
      position: relative;
      .song-lyric{
        color: white;
        flex-wrap: wrap;
        .lyric-wrapper{
          text-align: center;
        }
      }
      .no-lyric{
        text-align: center;
        line-height: 500px;
        color: white;
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
      align-items: center;
      padding-left: 12%;
      .left,.mid,.right{
        flex: 1;
      }
      .play{
        position: absolute;
        left: 41%;
        top: 35%;
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