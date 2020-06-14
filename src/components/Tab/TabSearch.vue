<template>
  <div>
    <searchBar :keyword="keyword" />
    <searchHot/>
    <searchResult/>
  </div>
</template>

<script>
import searchBar from '@/components/Tab/components/searchBar/index'
import searchHot from '@/components/Tab/components/searchHot/index'
import searchResult from '@/components/Tab/components/searchResult/index'
import { getSearchMultimatch, getSearchMusic } from '@/api/api.js'
  export default {
    components:{
      searchBar,
      searchHot,
      searchResult
    },
    data() {
      return {
        keyword:'',
        songList:[],
        isShowSongList:false
      }
    },
    methods:{
      searchMusic(params){
        this.keyword = params.keywords
        Promise.all([getSearchMusic(params),getSearchMultimatch(params)]).then(res =>{
          console.log(res);
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>