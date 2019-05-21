<template>
  <div class="container">
    <div class="form-row">
      <div  class="col-sm-offset-12 col-md-offset-12" id="register">
        <div class="col-sm-12 col-md-12">
          <Verification ref="users"  titlem="register" rol="0"></Verification>
          <div class="form-group">
            <input type="button" class="btn float-left btn-info" value="back" v-on:click="backlogin"/>
            <input type="button" class="float-right btn btn-success" value="sign up" v-on:click="registered"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  //TODO 补充逻辑，修复页面
  import Verification from "./Verification";
  export default {
    name: "Registered",
    components: {Verification},
    data() {
      return {
        title_message: "register",
        rol: 0,
      }
    },
    methods:{
      registered:function () {
        let users = this.$refs.users;
        var judge = users.judge;
        var judgevalue =0 ;
        for(var f of judge){
          judgevalue+=f;
        }
        if(judgevalue!=3){
          alert("无法注册，请填写好相关信息");
          return;
        }
        var usrid = users.userid;
        var psw   = users.psw;
        var user = {
          'userId':usrid,
          'password':psw
        };
        this.axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
        this.axios.post("user/register",user).then(body=>{
          var result = body.data;
          alert(result.data)
          if(result.isok){
            this.$router.push({path:  '/login'});
          }
          console.log(result.data)
        })
      },
      backlogin:function(){
        this.$router.push({path:  '/login'});
      }

    }
  }
</script>

<style scoped>

  .fa{
    display: inline-block;
    top: 27px;
    left: 6px;
    position:relative;
    color: #ccc;
  }
  #register{
    background: rgba(255,255,255,0.2);
    width:400px;
    margin: 150px auto;
  }
  input[type="text"],input[type="password"]{
    padding-left: 26px;
  }


</style>
