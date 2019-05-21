<template>
  <div class="container">
    <div class="form-row">
      <div class="col-sm-offset-12 col-md-offset-12" id="login">
        <div class="col-sm-12 col-md-12">
          <Verification   ref="users" :titlem="title_message"  :rol="rol"></Verification>
          <div class="form-group">
            <label class="checkbox">
              <input type="checkbox" name="rememberMe" value="1" />remember me
            </label>
            <hr/>
            <input type="button" class=" btn btn-success" value="login" v-on:click="it_login"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  //TODO 补充逻辑，修复页面
  import {setCookie,getCookie} from "../js/CookieModel";
  import Verification from "./Verification";

  export default {
    name: "Login",
    components: {Verification},
    data(){
      return {
        title_message:"login",
        rol:0,
      }
    },
    mounted:function(){
      let user = getCookie("user");
      if(user != null){
        var json = JSON.parse(user);
        var users = this.$refs.users;
        users.userid=json.user.userId;
        users.psw = json.user.password;
        users.judge[0]=1;
        users.judge[1]=1;
      }
    },
    methods:{
      it_login :function(){
        let users = this.$refs.users;
        var judge = users.judge;
        if(judge[0]==0 || judge[1]==0){
          alert("无法登陆，请填写好相关信息");
          return;
        }
        var formdate = new FormData();
        formdate.append( 'userId',users.userid,)
        formdate.append( 'password',users.psw,)
        // this.axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
        this.axios.post("user/login",formdate).then(body=>{
          this.result = body.data;
          var result = this.result;
          console.log(result);
          if(result.isok){
            setCookie("user",result.data);
            this.$router.push({path:'/home',query:result.data})
          }
          else{
            alert(result.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      backlogin:function(){
        this.$router.push({path:  '/login'});
      },

      // test_login:function () {
      //   var result = {
      //     userId:1
      // //   };
      //   setCookie("user",result);
      //   this.$router.push({path:'/home',query:result})
      //
      // }

    }
  }
</script>

<style scoped>

  #login{
    background: rgba(255,255,255,0.2);
    width:400px;
    margin: 100px auto;
  }


</style>
