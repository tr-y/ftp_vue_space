<template>

  <div class="container" >
    <div class="col-sm-12 col-md-12 row boom">
      <div class="col-sm-4 col-md-4 ">
        <button src="../assets/lengxing.png" class="rounded btn-info" alt="Cinque Terre" @click="show(1)">创建</button>
      </div>
      <div class="col-sm-8 col-md-8">
        <button src="../assets/lengxing.png" class="rounded  btn-success" alt="Cinque Terre" @click="jumpPath(1)">加入</button>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 row boom">
    <div class="col-sm-4 col-md-4">
      <button src="../assets/lengxing.png" class="rounded  btn-danger" alt="Cinque Terre" @click="show(2)">退群</button>
    </div>
      <div class="col-sm-8 col-md-8">
        <button src="../assets/lengxing.png" class="rounded  btn-dark" alt="Cinque Terre" @click="jumpPath(3)">返回</button>
      </div>
    </div>


    <!--模态框-->
    <div class="modal fade" id="folder_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 v-if="showParam == 1" class="modal-title">CREATGROUP</h4>
            <h4 v-if="showParam == 2" class="modal-title">提交退群意愿</h4>
          </div>
          <div class="bs-example bs-example-form" role="form"  >
            <div class="row">
              <div class="col-md-12">
              </div>
            </div>
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <input type="text" v-model="countvalue" />
            <button v-if="showParam == 2" type="button" class="btn btn-success" style="width: 100px; height: 100px;"  data-dismiss="modal" @click="subleave">提交</button>
            <button v-if="showParam == 1" type="button" class="btn btn-success" style="width: 100px; height: 100px;"  data-dismiss="modal" @click="creatGroup">确定</button>
            <button v-if="showParam == 1" type="button" class="btn btn-danger"  style="width: 100px; height: 100px;"  data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import  UserController from '../js/UserController'
  import  FGroup from '../js/FGroup'
  import  UserGroup from '../js/UserGroup'
  import {getCookie} from "../js/CookieModel";
    export default {
        name: "GroupView",
        data() {
          return {
            size: 10,
            paths: ["/home", "/groupSearch", "/groupView", "/home",],
            istrue: 0,
            userId:0,
            showParam:0,
            countvalue:""
          }
        },
      mounted:function(){
        let value = getCookie("user");
        var json = JSON.parse(value);
        this.userId = json.user.id
        this.groupId = json.user.groupId
      },
      methods:{
        jumpPath:function (param) {
          this.$router.push({path:this.paths[param]})
        },
        show:function (param) {
          this.showParam = param
          $('#folder_modal').modal('show');
        },
        back:function () {
          let userController  = new  UserController();
          let formdata = new FormData();
          formdata.append("id",this.userId)
          formdata.append("groupId",0)
          userController.update(this,formdata).then(result=>{
            if(result.data.isok){
              this.$router.push({path:this.paths[0]})
            }
          })
        },
        subleave:function () {
          let userGroup  = new UserGroup()

          let fromdata = new FormData();
          fromdata.append("groupId",this.groupId )
          fromdata.append("userId",this.userId )
          fromdata.append("message","退群："+this.countvalue)
          fromdata.append("state",22 )
          userGroup.send(this,fromdata).then(result=>{
            if(result.data.isok){
              alert("发送成功")
            }
            else{
              alert("发送失败")
            }
          })
        },
        creatGroup:function (name) {
          let userController  = new  UserController();
          let groups={
            name:this.countvalue,
            size:1,
            userId:this.userId
          }
          // let formdata = new FormData();
          //  formdata.append("name",this.countvalue)
          //  formdata.append("size",1)
          //  formdata.append("userId",this.userId)
          let fGroup = new FGroup()
          fGroup.creat(this,groups).then(result=>{
            if(result.data.isok){
              let formdata = new FormData();
              formdata.append("id",this.userId)
              formdata.append("groupId",result.data.data)
              userController.update(this,formdata).then(result=>{
                if(result.data.isok){
                  alert("创建成功")
                }
                else {
                  alert("创建失败")
                }
              })
            }
          })
        }




      }
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
    color: white;
  }
  .boom{
    padding-top: 80px;
  }

</style>
