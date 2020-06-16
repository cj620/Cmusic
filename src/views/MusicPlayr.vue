<template>
  <div class="music-playr">
    <!-- 背景 -->
    <div
      ref="song-bg"
      class="song-bg"
      :style="{backgroundImage:`url(${songInfo.picUrl})`}"
    />
    <!-- 头部 -->
    <div class="song-title">
      {{songInfo.name}}
    </div>
<!-- 中部 -->
    <div @click="getLyric" class="content">
      <Lyric :lyric="lyric" :currentTime="currentTime"  v-show="lyricShow"/>
      <demoPic :img="songInfo.picUrl" v-show="!lyricShow"  :stopPop="stopPop"/>
    </div>
    <!-- 底部控制条 -->
 <div class="bottom">
   <controllBtn @stop="change" @prev='prevFn' :isStop='isStop'/>
 </div>
  <audio :src="musicUrl" autoplay ref='audio' v-show="false"></audio>
    </div>
</template>
<script>
import { getMusicDetail ,getMusicUrl,getMusicLyric} from '@/api/api'
import Lyric from '@/components/Player/Lyric'
import controllBtn from '@/components/Player/ControllBtn'
import demoPic from '@/components/Player/demoPic'
  export default {
    components:{
      Lyric,
      controllBtn,
      demoPic
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
        lyricShow:false,
        stopPop:false,
        songInfo: {
        picUrl: '',
        name: ''
       }
      }
    },
    created(){
      this.init()
      this.$nextTick(
        this.updateTime()
      )

      
    },
    beforeDestroy(){
      clearInterval(this.timer)
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
        this.stopPop = false
        this.updateTime();
      }else{
        this.$refs.audio.pause();
        this.stopPop =true
        clearInterval(this.timer)
      }
    },
    updateTime(){
      this.timer = setInterval(() => {
          this.currentTime = this.$refs.audio.currentTime;    
        // this.currentTime = this.$refs.audio.currentTime;        
      }, 10);
    },
    getLyric(){
      this.lyricShow = !this.lyricShow
      // console.log("-----");
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
  .song-title{
    position: fixed;
    top: 0;
    height: 10vh;
    width: 100vw;
    padding: 0 5vh;
    text-align: center;
    line-height: 10vh;
    color: burlywood;
    font-size: 7vw;
    overflow: hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap
  }
  .content{
    position: fixed;
    top: 10vh;
    height: 50vh;
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .bottom{
    position: fixed;
    bottom: 0;
  }
}
 
</style>