<template>
  <div class="container">
    <form id="personal">
        <div class="col-sm-12 col-md-12">
            <div >
              <img src="../assets/user.jpg" width="100px" class="rounded mx-auto d-block" alt="...">
              <div class="form-group"  >
                <div class="float-left" >
                 <label>昵称</label>
                  <input  class="form-control text"  placeholder="nickname" name="studentId"  type="text" />
                </div>
                <div class="float-right " >
                  <label>密码</label>
                  <input  class="form-control text"  placeholder="password" name="nickname"  type="text"/>
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
    export default {
        name: "Personal",
        methods:{
          backhome(){
            this.$router.push({path:"/home"})
          },
          updateUser(){
            this.axios.put("",lis).then(body=>{
              var result = body.data
              if(result.isok){
                alert("修改成功")
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
    margin: 150px auto;
    height:500px;
  }

  input[type="button"]{
    width: 220px;
    margin-top:200px;
  }
  label{
    color:white;
  }
</style>
