<template>
  <div class="container">
    <div class="col-sm-12 col-md-12">
      <div id="c_message">
        <GroupMenu :groupId = "groupId"></GroupMenu>
        <div>
          <div id="lt_send">
              <textarea v-model="putMessage" class="alpha" rows="5" cols="30" maxlength="30" style="color: white">
              </textarea>
            <div class="col-md-12 col-md-offset-10">
              <input type="button" class=" btn btn-success" value="发送" @click="addMessage"/>
            </div>
          </div>
          <div id="cardbody" class="card card-body-default alphagd  float-right">
            <div  class="container"  v-for="item in items">
              <table class="table table-striped  table-hover" v-bind:class="tablesclass[(item.id)%4]">
                <tbody>
                <td style="font-size: small">{{item.message}}</td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr style="clear: both"/>
      </div>
    </div>
  </div>
</template>

<script>
  import GroupMenu from "./GroupMenu"
  export default {
    name: "GroupMessage",
    components: {GroupMenu},
    data(){
      return{
        items :[],
        tablesclass:["table-success","table-dark","table-info","table-light"],
        putMessage:"",
        groupId:1
      }
    },
    mounted :function(){
      this.getListMessage(1)
    },
    methods:{
      getListMessage(param){
        var lis = {
          params: {
            groupId: param,
          }
        }
        this.axios.get("groupMessage/list",lis).then(body=>{
          this.result = body.data;
          this.items = this.result.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      addMessage(){
          if(this.putMessage!==""){
            var lis = {
              groupid : this.groupId,
              creatTime:new Date(),
              message: this.putMessage,
            }
            this.axios.post("groupMessage/add",lis).then(body=>{
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
  #c_message {
    display: table;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    height: 800px;
  }

  #lt_send {
    margin-top: 300px;
    margin-right: 10px;
    float: left;
  }

  #cardbody {
    float: right;
    margin-top: 20px;
    height: 500px;
    width: 500px;
    display: block;
    overflow-y: scroll;
  }

  /*.contendt{*/
  /*height: 800px;*/
  /*width: 1000px;*/
  /*}*/
  .alpha {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
