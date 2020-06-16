<template>
<div class="demo-pic">
    <div class="demo-img" ref="stopImg" :style="{backgroundImage:`url(${img})`}">
    </div>
</div>
</template>

<script>
  export default {
    props:{
      img:"",
      stopPop:''
    },
    watch:{
      stopPop:{
        handler(newName, oldName){
          if(newName ==true){
            this.$refs.stopImg.style.animationPlayState = 'running'
          }else{
            this.$refs.stopImg.style.animationPlayState = 'paused'
          }
        },
        // immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.demo-pic{
    height: 70vh;
    // background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    .demo-img{
      width: 65vw;
      height: 65vw;
      // overflow: hidden;
      border-radius: 50%;
      background-size: cover;
      animation:pop 4s linear infinite;
      @keyframes pop {
        0%{
          transform: rotate(0deg) scale(1);
        }
        50%{transform: rotate(180deg) scale(1.2)
        }
        100%{
          transform: rotate(360deg) scale(1)
        }
      }
    }
}
</style>