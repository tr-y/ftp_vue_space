<template>

  <div class="container">
    <div class="col-sm-12 col-md-12 row boom">
      <div class="col-sm-4 col-md-4 ">
        <button src="../assets/lengxing.png" class="rounded" alt="Cinque Terre">创建</button>
      </div>
      <div class="col-sm-8 col-md-8">
        <button src="../assets/lengxing.png" class="rounded" alt="Cinque Terre">加入</button>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 row boom">
    <div class="col-sm-4 col-md-4">
      <button src="../assets/lengxing.png" class="rounded" alt="Cinque Terre">删除</button>
    </div>
      <div class="col-sm-8 col-md-8">
        <button src="../assets/lengxing.png" class="rounded" alt="Cinque Terre">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GroupView"
    }
</script>

<style scoped>
  img{
    width: 200px;
  }
  button{
    width: 200px;
    height: 200px;
    background-image: url("../assets/lengxing.png");
    background-size: 200px;
    margin-top: 20px;
    filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;
    background-color:rgba(255,255,255,0.2);
    color: white;
  }
  .boom{
    padding-top: 80px;
  }

</style>
