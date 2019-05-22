<template>
  <div class="container">
    <form id="personal">
        <div class="col-sm-12 col-md-12">
            <div >
              <img src="../assets/user.jpg" width="100px" class="rounded mx-auto d-block" alt="...">
              <div class="form-group"  >
                <div class="float-left" >
                 <label>昵称</label>
                  <input  class="form-control text"  v-model="userId"   placeholder="nickname" name="studentId"  type="text" />
                </div>
                <div class="float-right"  >
                  <label>密码</label>
                  <input  class="form-control text"  v-model="password" placeholder="password" name="nickname"  type="text"/>
                </div>
             </div>
              <div style="clear: both"></div>
              <div class="form-group"  >
              <div class="float-left" >
                <label>FTP账号</label>
                <input  class="form-control text"   v-model="ftpid" placeholder="nickname" name="studentId"  type="text" />
              </div>
              <div class="float-right" >
                <label>FTP账号密码</label>
                <input  class="form-control text"   v-model="ftppassword" placeholder="password" name="nickname"  type="text"/>
              </div>
              </div>
              <div style="clear: both"></div>
              <div class="form-group "  >
                <div class="float-left" >
                  <input type="button" class=" btn btn-info" value="back" @click="backhome"/>
                </div>
                <div class="float-right" >
                  <input type="button" class=" btn btn-success" value="bind" @click="updateUser"/>
                </div>
              </div>
            </div>

        </div>
    </form>
  </div>
</template>

<script>
  import {setCookie,getCookie} from "../js/CookieModel";
  import UserController from "../js/UserController";
    export default {
        name: "Personal",
        data(){
          return{
            userId:0,
            password:0,
            ftpid:0,
            ftppassword:0,
            id:0
          }
        },
        mounted:function () {
          let value = getCookie("user");
          if(value == null){
            this.$router.push({path:  '/login'});
            return
          }
          var json = JSON.parse(value);
          this.id = json.user.id
          this.userId = json.user.userId
          this.password = json.user.password
          this.ftpid = json.user.userFtp.ftpId
          this.ftppassword = json.user.userFtp.ftp_pswd
        },
        methods:{
          backhome(){
            this.$router.push({path:"/home"})
          },
          updateUser(){
            let userController  = new  UserController();
            var fd = new FormData();
              fd.append("id",this.id);
              fd.append("userId",this.userId);
              fd.append("password",this.password);
            userController.update(this,fd).then(body=>{
              var result = body.data
              if(result.isok){
                alert("修改成功")
                this.$router.push({path:"/login"})
              }
            }).catch(function (error) {
              console.log(error);
            });

          }
      }
    }
</script>

<style scoped>
  form{
    width:700px;
    margin: 100px auto;
    height:500px;
  }

  input[type="button"]{
    width: 220px;
    margin-top:200px;
  }
  label{
    color:white;
    margin-top: 100px;
  }

</style>
