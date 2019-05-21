<template>
  <div class="container">
    <div class="float-left">
      <input type="button" class=" btn btn-success" value="主页" @click="jumpPath(0)"/>
    </div>
    <div v-if="userId==groupId" class="col-md-4 col-md-offset-3 float-left" >
      <input type="button" class=" btn btn-info" value="群组管理" @click="jumpPath(1)"/>
    </div>
    <div class="col-md-2 col-md-offset-1 float-left">
      <input type="button" class=" btn btn-dark" value="通知" @click="jumpPath(2)"/>
    </div>
    <div class="col-md-2 col-md-offset-1 float-right">
      <input type="button" class=" btn btn-danger " data-toggle="modal"  value="退群" data-target="#myModal "/>
    </div>
    <div class="float-right">
      <input type="button" class="btn btn-info" value="查询"@click="jumpPath(3)"/>
    </div>
    <hr style="clear: both"/>


    <!-- 模态框 -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">

          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">提交退群意愿</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- 模态框主体 -->
          <div class="modal-body">
            <input v-model="subMessage" class="form-control text"  placeholder="意见反馈" name="userId"  type="text"   autofocus="autofocus"/>
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="subleave">提交</button>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "GroupMenu",
    data(){
      return{
        userId:1,
        groupId:1,
        paths:["/home","/GroupOwner","/groupMessage","/groupSearch"],
        subMessage:""

      }
    },
    mounted :function(){

      // this.userId=this.$route.query.userId;
      // this.groupId=this.$route.query.groupId;
    },
    methods:{
      jumpPath:function (param) {
        this.$router.push({path:this.paths[param]})
      },

      subleave:function () {
        if(this.subMessage!==""){
          let lis={
            groupId:this.userId,
            userId:this.userId,
            message:this.subMessage,
            state:1,
          }
          this.axios.post("userGroup/add",lis).then(body=>{
            this.result = body.data;
            this.items = this.result.data;
            this.getListMessage( this.groupId)
          }).catch(function (error) {
            console.log(error);
          });
        }

      }

    }

  }
</script>

<style scoped>

</style>
