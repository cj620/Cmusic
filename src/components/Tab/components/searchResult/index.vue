<template>
  <div>
    <SongsList :songList="songList" />
  </div>
</template>

<script>
import SongsList from '@/components/SongList/index'
  export default {
    components:{
      SongsList
    },
    props:{
      songList:{
        type:Array,
        // required:true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>