<template>
  <div id="app">
      <router-view name="right_space"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  /*overflow:hidden*/

}
body{
  background: url("assets/flight.jpg") no-repeat;
  background-size: cover;
  font-size: 16px;
  height: 850px;
  /*//home*/
  /*overflow-y: hidden;*/
}
</style>
