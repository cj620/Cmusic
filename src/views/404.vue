<template>
  <div class="not-page">
    <h1>404 not found</h1>
    <router-link to="/" >返回首页</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .not-page{
    text-align: center;
    h1{
      padding: 40px;
    }
    a{
      font-size: 24px;
    }
  }
</style>