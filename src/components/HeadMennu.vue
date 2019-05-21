<template>
  <nav class="navbar  navbar-expand-lg navbar-dark " role="navigation"  style="  background: rgba(255,255,255,0.2);">
    <div class="container-fluid">
      <!--<div class="navbar-header">-->
        <!--<a class="navbar-brand" href="#"></a>-->
      <!--</div>-->
      <div  class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item"><button type="button" class="btn btn-secondary"   v-on:click="istrue=0;jumpPath(0)">私人</button ></li>
          <li class="nav-item"><button type="button" class="btn btn-secondary"   v-on:click="istrue=1;jumpPath(1)">共享</button ></li>
          <li class="nav-item"><button type="button" class="btn btn-secondary"   v-on:click="jumpPath(2)">群组</button ></li>
          <!--<li class="nav-item"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="1" aria-valuemax="100"></div></li>-->
          <!--:class="istrue == 0?'btn-dark':'btn-secondary'" :class="istrue == 1?'btn-dark':'btn-secondary'"   :class="istrue == 2?'btn-dark':'btn-secondary'" -->
          <!--<li class="nav-item"><button type="button" class="btn"  :class="istrue == 3?'btn-dark':'btn-secondary'" @click="jumpPath(3)">空间</button ></li>-->
          <!--"istrue == 4?'btn-dark':'btn-secondary'"-->
          <!--:class="istrue == 5?'btn-dark':'btn-secondary'"-->
          <li class="nav-item"><button type="button" class="btn btn-secondary"   v-on:click="jumpPath(4)">个人</button ></li>
          <li class="nav-item"><button type="button" class="btn btn-secondary"  v-on:click="jumpPath(5)">消息</button ></li>
        </ul>
        <div   id="pbar" class="progress navbar-nav" style="width: 100px;">
          <div  class="progress-bar nav-item" role="progressbar" :style="{width:homeMennusize+'%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{homeMennusize}}</div>
        </div>
      </div>

    </div>
  </nav>

</template>

<script>
  export default {
    name: "Headmennu",
    props:['homeMennusize','userId','groupId'],
    data(){
      return{
        size:10,
        paths:["/home","/groupHome","/groupMessage","/space","/personal","/message"],
        istrue:0
      }
    },
    methods:{
      jumpPath:function (param) {
        this.istrue = param;
        if(param == 5){
          this.messageresh();
          return;
        }
        this.$router.push({path:this.paths[param]})
      },
      //TODO
      messageresh:function(){
        this.$emit('childmessageresh');
      },
    }
  }
</script>

<style scoped>

  ul li{
    margin-left:165px ;
  }

  button{
    width:50px;
    height: 50px;
    border-radius: 50%;
    font-size: 5px;
  }
  #pbar{
    margin-right: 25px;
  }
</style>
