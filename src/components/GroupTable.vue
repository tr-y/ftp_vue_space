<template>
  <table class="table table-striped table-dark table-hover">
    <tbody >
    <tr >
      <th v-for="head in headlist">{{head}}</th>
    </tr>
      <tr  v-for="item in items">
        <td >{{item.name}}</td>
        <td >{{item.size}}</td>
        <td ><button class="btn btn-outline-success" v-on:click="sendJoin(item.id)">join</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import FGroup from "../js/FGroup"
  import {getCookie} from "../js/CookieModel";
  import UserGroup from "../js/UserGroup";
    export default {
      name: "GroupTable",
      data() {
        return {
          state:0,
          headlist: ["群组名", "用户数", ""],
          items: [],
          user_id:0,
          fgroup :new FGroup(),
        }
      },
      mounted:function(){
        let user = getCookie("user");
        if(user != null) {
          var json = JSON.parse(user);
          this.user_id = json.user.id;
          this.userId = json.user.userId;
        }
        var  fgroup = new FGroup();
        this.items = fgroup.getList(this);
      },
      methods:{
        join:function (groupId) {
          var  fgroup = new FGroup();
          fgroup.join(this,this.user_id,this.userId,groupId)
        },
        sendJoin:function(groupId){
          let usergroup  = new UserGroup()
          let fromdata = new FormData();
          fromdata.append("groupId",groupId )
          fromdata.append("userId",this.user_id )
          fromdata.append("message","加入")
          fromdata.append("state",11 )
          usergroup.send(this,fromdata).then(result=>{
            if(result.data.isok){
              alert("发送成功")
            }
            else{
              alert("发送失败")
            }
          })
        },
        search:function (groupName) {
          this.fgroup.search(this,groupName)
        }
      }
    }
</script>

<style scoped>
  td input[type="checkbox"]{
    float: left;
  }
</style>
