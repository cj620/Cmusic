<template>
  <div>
    <searchBar :keyword="keyword" />
  </div>
</template>

<script>
import searchBar from '@/components/Tab/components/searchBar/index'
import { getSearchMultimatch, getSearchMusic } from '@/api/api.js'
  export default {
    components:{
      searchBar
    },
    data() {
      return {
        keyword:'',
        songList:[],
        isShowSongList:false
      }
    },
    // methods:{
    //   searchMusic(params){
    //     this.keyword = params.keywords
    //     Promise.all([getSearchMusic(params),getSearchMultimatch(params)]).then(res =>{
    //       console.log(res);
          
    //     })
    //   }
    // }
  }
</script>

<style lang="scss" scoped>

</style>