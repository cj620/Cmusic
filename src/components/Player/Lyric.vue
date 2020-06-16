<template>
  <div class='lyric-box'>
    <div class="lyric">
      <div
        class="lyric-list"
        :style="{transform:`translateY(${moveY}px)`}"
      >
        <p
          v-for='(item,index) in lyricAry'
          ref='p'
          :key='index'
          :class='{active:activeIndex == index}'
        >{{item[1]}}</p>
      </div>
    </div>

  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "Lyric",
  props: ["lyric", "currentTime"],
  data() {
    return {
      // lyricAry:[]
      moveY: 0
    };
  },
  computed: {
    lyricAry() {
      let str = this.lyric;
      let ary = [];
      str.replace(/\[(\d+):(\d+)\.(\d+)\] *([^\n]+)/g, function(a, b, c, d,e) {
        // console.log(b, c);
        ary.push([b * 60 + c * 1 + d/1000, e]);
      });
      
      return ary;
    },
    activeIndex() {
      let temp = 0;
      let bol = this.lyricAry.some((item, index) => {
        temp = index;
        return this.currentTime <= item[0];
      });
      return bol ? temp - 1 : this.lyricAry.length-1;
      
    }
    
  },
  watch: {
    activeIndex(cur) {
      if(cur<6)return;
      let el = this.$refs.p[cur - 1];      
      if (el) {
        let obj = getComputedStyle(el);   //这是每行歌词的对象
        this.moveY -= parseFloat(obj.height) //用它的高来作为偏移量
        // console.log(this.moveY);
      }
    },
    lyricAry(){
      this.moveY = 0;
    }
  },
  methods: {
    matchLyric() {}
  },
  components: {}
};
</script>
<style lang="scss">
.lyric-box {
  color: #fff;
  font-size: 17px;
  height: 70vh;
  overflow: hidden;
  text-align: center;
  .lyric {
    height: 70vh;
    color: #b3b0b0;
    overflow: hidden;
  }
  .lyric-list{
    transition: all 1s;
  }
  p {
    padding:10px;
  }
  p.active {
    color: #fff;
  }
}
</style>