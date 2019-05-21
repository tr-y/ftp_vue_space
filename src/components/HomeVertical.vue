<template>
  <div id="body_v" >
      <div class="t-center">
        <ul >
          <li><button  class="btn btn-secondary btn-lg " role="button" aria-disabled="true" @click="getHomeList">所有文件</button></li>
          <li><button  class="btn btn-secondary btn-lg " role="button" aria-disabled="true" @click="searchByType(1)">图片</button></li>
          <li><button  class="btn btn-secondary btn-lg " role="button" aria-disabled="true" @click="searchByType(2)">文档</button></li>
          <li><button  class="btn btn-secondary btn-lg " role="button" aria-disabled="true" @click="searchByType(3)">视频</button></li>
          <li><button  class="btn btn-secondary btn-lg " role="button" aria-disabled="true" @click="searchByType(4)">音乐</button></li>
          <li><button  class="btn btn-secondary btn-lg " role="button" aria-disabled="true" @click="searchByType(5)">其他</button></li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeVertical",
    methods:{
      searchByType:function (param) {
        this.$emit('chiletype',param);
      },
      getHomeList:function () {
        this.$emit('getHomeList');
      }
    }


  }
</script>

<style scoped>
  #body_v{
    height: 620px;
    width: 200px;
    display:inline;
    float: left;
    margin-top: 10px;
  }
  #body_v li{
    list-style-type: none;
    padding-top: 40px;
    margin-top:12px;
  }
  .t-center{
    width: 80%;
    margin: auto;
    padding: auto;
    height: 100%;
    background: rgba(255,255,255,0.2);
  }
  ul,li {margin:0;padding:0;}

</style>
