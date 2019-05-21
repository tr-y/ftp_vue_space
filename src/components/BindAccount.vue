<template>
  <div class="container">
    <div  class="form-row">
      <form class="col-sm-offset-3 col-md-offset-3" id="register">
        <div class="col-sm-12 col-md-12">
          <div  v-if="bindstate==1" >
            <Verification  :titlem="title_message"  :rol="rol"></Verification>
            <div  class="form-group">
              <input type="submit" class=" btn btn-success" value="bind"/>
            </div>
          </div>
          <div class="disbind form-group">
            <h2><span class="label label-default">{{username}}bind</span></h2>
            <hr/>
            <input type="submit" class=" btn btn-danger" value="disbind"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Verification from "./Verification";
    export default {
        name: "BindAccount",
        components: {Verification},
         props:['bindstate'],
      data(){
        return {
          title_message:"bind",
          rol:0,
          username:""
        }
      }
    }
</script>

<style scoped>
  form{
    background: rgba(255,255,255,0.2);
    height: 300px;
    margin: 100px auto;
    width: 400px;
  }
  .disbind{
    padding-top: 80px;
    margin-bottom: auto;
    color: white;
  }

</style>
