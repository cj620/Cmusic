<template>
  <div class="time-line">
    <van-slider v-model="value" @change="onChange" />
  </div>
</template>

<script>
import { Slider } from 'vant'
import { Toast } from 'vant';
  export default {
    data() {
      return {
        value:1
      }
    },
    props:{
      currentTime:''
    },
    // computed:{
    //   time(){
    //     return parseInt((this.currentTime/this.$store.state.lastTime)*100)
    //   }
    // },
    methods:{
      onChange(value) {
      Toast('当前值：' + value);
      // console.log(value*this.$store.state.lastTime/100);
      // console.log(this.$parent.currentTime);
      this.$parent.currentTime = value*this.$store.state.lastTime/100
      
      
    }
    },
    watch:{
      currentTime(){

        this.value = parseInt((this.currentTime/this.$store.state.lastTime)*100+1)

        // console.log(parseInt((this.currentTime/this.$store.state.lastTime)*100));
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>