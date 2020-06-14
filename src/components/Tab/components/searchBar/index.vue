<template>
<div class="search">
      <!-- 阻止冒泡 -->
  <form @submit.prevent="onSubmit">
    <div class="inputcover">
      <van-icon name="search" />
      <input type="text" v-model="text" placeholder="搜索歌曲、歌手、专辑">
      <label />
    </div>
  </form>
</div>
</template>

<script>
  export default {
    props:{
      keyword:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        text:''
      }
    },
    watch:{
      keyword:function(newVal){
        this.text = newVal
      }
    },
    methods:{
      onSubmit(){
        if(!this.text.trim()){
          this.$toast('您未输入')
          return
        }
        const params = {
          keywords:this.text.trim()
        }
        this.$parent.searchMusic(params)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>