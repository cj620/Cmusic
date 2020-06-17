<template>
<div class="home-top">

  <div class="top">
    <img src="./logo2.svg" alt="logo">
    <div class="txt">Cmusic</div>
  </div>
  <div class="buttom">
    
 <van-tabs v-model="active" animated color="#443e8f9d">
     <van-tab v-for="value in tabName" :key="value.id" :title="value.title">
       <component :is="value.component" keep-alive />
     </van-tab>
  </van-tabs>

  </div>
</div>
</template>

<script>
import TabIndex from '@/components/Tab/TabIndex'
import TabRank from '@/components/Tab/TabRank'
import TabSearch from '@/components/Tab/TabSearch'
  export default {
    components: {
      TabIndex,
      TabRank,
      TabSearch 
    },
    data() {
      return {
        active:0,
        tabName:[
          { component: 'TabIndex', id: 0, title: '推荐音乐' },
          { component: 'TabRank', id: 1, title: '热歌榜' },
          { component: 'TabSearch', id: 2, title: '搜索' }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
.home-top{
  .top {
    height: 75px;
    display: flex;
    align-items: center;
    background-color: #443e8f9d;
    .txt{
      font-size: 10vw;
      color: rgb(247, 172, 35);
      margin-left: 4vw;
    }
    > img {
      width: 15vw;
      max-width: 12vh;
      margin-left: 22vw;
      overflow: hidden;
    }
  }
  .bottom {
    height: 55px;
    background: #000;
    font-size: 20px;
  }
}
</style>