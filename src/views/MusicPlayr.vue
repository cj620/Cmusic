<template>
  <div class="music-playr">
    <!-- 背景 -->
    <div
      ref="song-bg"
      class="song-bg"
      :style="{backgroundImage:`url(${songInfo.picUrl})`}"
    />
    <Lyric :lyric="lyric" :title="songInfo.name" :currentTime="currentTime"/>
    <ControllBtn @stop="change" @prev='prevFn' :isStop='isStop'/>

  <audio :src="musicUrl" autoplay ref='audio'></audio>
    </div>
</template>

<script>
import { getMusicDetail ,getMusicUrl,getMusicLyric} from '@/api/api'
import Lyric from '@/components/Player/Lyric'
import ControllBtn from '@/components/Player/ControllBtn'
  export default {
    components:{
      Lyric,
      ControllBtn
    },
    data() {
      return {
        musicId: this.$route.query.id,  //当前点击的歌曲id
        lyric:'',
        musicUrl:'',
        isStop:true,
        currentTime:0,
        timer:null ,
        isStop:false,
        idIndex:0,

        songInfo: {
        picUrl: '',
        name: ''
       }
      }
    },
    created(){
      this.init()
      this.updateTime()
    },
    methods:{
      async init(){
      await getMusicUrl(this.musicId).then(res=>this.musicUrl=res.data[0].url)  //得到歌曲地址
      await getMusicDetail(this.musicId).then(res => {
        this.songInfo = res.songs[0].al;
        // console.log(this.songInfo);
        // console.log(res);     
      })
      await getMusicLyric(this.musicId).then(res =>{
        this.lyric = res.lrc.lyric
      })
      },
      prevFn(){
      this.idIndex = (this.idIndex - 1) < 0 ? this.idList.length-1 : this.idIndex - 1;
      this.getInfo(this.idList[this.idIndex]);
    },
    // nextFn(){
    //   this.idIndex = (this.idIndex + 1) >= this.idList.length ? 0 : this.idIndex + 1;
    //   this.getInfo(this.idList[this.idIndex]);
    // },
    change(state){
      this.isStop = state;
      if(!state){
        this.$refs.audio.play()
        this.updateTime();
      }else{
        this.$refs.audio.pause();
        clearInterval(this.timer)
      }
    },
    updateTime(){
      this.timer = setInterval(() => {
          // this.currentTime = this.$refs.audio.currentTime;    
        // this.currentTime = this.$refs.audio.currentTime;        
      }, 10);
    }
      
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
}
  // 头部
  

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