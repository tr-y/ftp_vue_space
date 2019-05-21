<template>
  <div>
    <h3 class="form-title">{{titlem}}</h3>
    <div class="form-group">
      <i class="fa fa-user fa-lg"></i>
      <input   v-model="userid" v-if="rol==0" ref="userid"  class="form-control email" @change="checkemails()" placeholder="email" name="userId"  type="email" />
      <input   v-model="userid" v-if="rol==1" ref="userid" class="form-control text"  placeholder="username" name="userId"  type="text"   autofocus="autofocus"/>
      <i class="interror">{{usi}}</i>
    </div>
    <div class="form-group">
      <i  class="fa fa-lock fa-lg"></i>
      <input ref="psw"   v-model="psw" class="form-control required" type="password" @change="checkpsw()"  placeholder="password" name="password" maxlength="15"/>
      <i class="interror">{{pswi}}</i>
    </div>

    <div v-if="titlem=='register'" class="form-group">
      <i class="fa fa-check fa-lg"></i>
      <input ref="repsw"   class="form-control required" type="password" placeholder="re_password" @change="checkequals()" name="repassword" maxlength="15"/>
      <i class="interror">{{repswi}}</i>
   </div>
  </div>
</template>
<script>


  export default {
    name: "Verification",
    props: ['rol','titlem'],
    data() {
      return {
        tests: 'text',
        psw:'',
        userid:"",
        usi:"",
        pswi:"",
        repsw:"",
        repswi:"",
        judge:[0,0,0]
      }
    },
    methods:{

    checkemails:function() {
        this.userid = this.$refs.userid.value;
        var cemail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
        if(!cemail.test(this.userid)){
          this.usi = "邮箱格式不规范";
          this.judge[0]=0;
        }
        else{
          this.usi ="";
          this.judge[0]=1;
        }

      },
      checkpsw:function () {
        this.psw = this.$refs.psw.value;
        var pattern = /^[\w_-]{6,16}$/;
        if(!pattern.test(this.psw)){
          this.pswi = '最短6位，最长16位 {6,16}" +\n' +
            '        "可以包含小写大母 [a-z] 和大写字母 [A-Z]\\n" +\n' +
            '        "可以包含数字 [0-9]\\n" +\n' +
            '        "可以包含下划线 [ _ ] 和减号 [ - ]'
          this.judge[1]=0;
        }
        else{
          this.pswi ="";
          this.judge[1]=1;
        }
        if(this.repsw!=""){
          this.checkequals();
        }
      },
      checkequals:function () {
        this.repsw = this.$refs.repsw.value;
        var  psw = this.$refs.psw.value;
        if(this.repsw == psw){
          this.repswi = "";
          this.judge[2]=1;
        }
        else{
          this.repswi ="密码输入不一样";
          this.judge[2]=0;
        }

      }
    }
  };

</script>

<style scoped>
  input[type="text"],input[type="email"],input[type="password"]{
    padding-left: 26px;
  }
  .fa{
    display: inline-block;
    top: 27px;
    left: 6px;
    position:relative;
    color: #ccc;
  }

  .interror{
    color: #FFFFF0;
  }

</style>
