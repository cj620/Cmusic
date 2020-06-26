<template>
    <div class='bot-btn-box'>
        <!-- <span class='icon-prev iconfont' @click="prev"></span> -->
        <span @click="prev">
          <svg class="icon left" aria-hidden="true"> <use xlink:href="#icon-bofangqi-xiayiji"></use> </svg>
       </span>
        <!-- <span :class='(isStop?"icon-play":"icon-stop")+" iconfont"' @click='change'></span> -->
        <span  @click='change'>
          <div class="play" v-show="!show"><svg class="icon" aria-hidden="true"> <use xlink:href="#icon-bofangqi-zanting"></use> </svg></div>
           <div class="pause" v-show="show"><svg class="icon" aria-hidden="true"> <use xlink:href="#icon-bofangqi-bofang"></use> </svg></div>
        </span>

        <span  @click='next'>
          <svg class="icon" aria-hidden="true"> <use xlink:href="#icon-bofangqi-xiayiji"></use> </svg>
        </span>
    </div>
</template>
<script>
export default {
    name: 'XXX',
    props:["isStop"],
    data() {
        return {
          show:false
        }
    },
    methods: {
      change(){
        // this.isStop = !this.isStop;
        this.$emit('stop',!this.isStop)
        this.show = !this.show
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
    height: 20vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    >span{
      flex: 1;
      width: 7vw;
      height: 10vh;
      text-align: center;
      position: relative;
      }
      .left{
        transform: rotate(180deg);
      }
      .pause{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
      }
      
  }
  .icon {
    width:1em;height:1em;
    vertical-align: -0.15em;
    fill:currentColor;
    overflow:hidden;
    font-size: 15vw;
    color: rgba($color: rgba(155, 160, 175, 0.333), $alpha: 0.7)
}
</style>