<template>
  <div class="container">
    <h2>下拉菜单</h2>
    <p>.dropdown 类用来指定一个下拉菜单。</p>
    <p>.dropdown-menu 类来设置实际下拉菜单。</p>
    <p>我们可以使用一个按钮或链接来打开下拉菜单， 按钮或链接需要添加 .dropdown-toggle 和 data-toggle="dropdown" 属性。</p>
    <div class="dropdown">
      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
        Dropdown button
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Link 1</a>
        <a class="dropdown-item" href="#">Link 2</a>
        <a class="dropdown-item" href="#">Link 3</a>
      </div>
    </div>
  </div>
</template>

<script>
import "jquery"
import "popper.js"
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*h1, h2 {*/
    /*font-weight: normal;*/
  /*}*/
  /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
  /*}*/
  /*li {*/
    /*display: inline-block;*/
    /*margin: 0 10px;*/
  /*}*/
  /*a {*/
    /*color: #42b983;*/
  /*}*/
</style>
