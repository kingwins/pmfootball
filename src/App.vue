<template>
  <div id="app">
    <router-view />  
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'); */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
body{
  background: #f5f7f9 !important;
}
</style>
