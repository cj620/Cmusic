<template>
  <div>
<h1>热搜界面</h1>
  </div>
</template>

<script>
import { getMusicDetail ,getMusicUrl} from '@/api/api'
  export default {
    data() {
      return {
        musicId: this.$route.query.id,  //当前点击的歌曲id
        playBtnShow: false,    //默认不显示
        songInfo: {
        picUrl: '',
        name: ''
      }
      }
    },
    created(){
      this.init()
    },
    methods:{
      async init(){
      //  console.log(getAlbum(this.musicId));
      // console.log(getMusicUrl(this.musicId));
      await getMusicUrl(this.musicId);
      await getMusicDetail(this.musicId).then(res => {
        // getPageTitle(res.songs[0].name, res.songs[0].ar[0].name)
        this.songInfo = res.songs[0].al;
        // console.log(res);
        
      });
       
        
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>