<template>
    <div class='bot-tn-box'>
        <span class='icon-prev iconfont' @click="prev">按钮1</span>
        <!-- <span :class='(isStop?"icon-play":"icon-stop")+" iconfont"' @click='change'></span> -->
        <span  @click='change'>按钮2</span>
        <span class='icon-next iconfont' @click='next'>按钮2</span>
    </div>
</template>
<script>
// @ is an alias to /src
// icon_play
export default {
    name: 'XXX',
    props:["isStop"],
    data() {
        return {}
    },
    methods: {
      change(){
        // this.isStop = !this.isStop;
        this.$emit('stop',!this.isStop)
      },
      prev(){
        this.$emit('prev')
      },
      next(){
        this.$emit('next')
      }
    },
    components: {
        
    }
}
</script>
<style lang="scss">
  .bot-btn-box{
    position: fixed;
    bottom:0;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 200;
    text-align: center;
    color:#fff;
    span:nth-child(2){
      font-weight: 600;
    }
    span{
      font-size: 40px;
      margin: 0 5vw;

    }
  }
</style>