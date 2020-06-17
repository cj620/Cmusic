<template>
  <div class="time-line">
    <van-slider v-model="value"  />
    {{value}}
  </div>
</template>

<script>
import { Slider } from 'vant'
  export default {
    data() {
      return {
        value:parseInt((this.currentTime/this.$store.state.lastTime)*100)
      }
    },
    props:{
      currentTime:''
    },
    computed:{
      time(){
        return parseInt((this.currentTime/this.$store.state.lastTime)*100)
      }
    },
    methods:{
      onChange(value) {
      Toast('当前值：' + value);
    }
    }
  }
</script>

<style lang="scss" scoped>

</style>