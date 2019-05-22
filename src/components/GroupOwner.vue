<template>
  <div class="container">
    <div class="col-sm-12 col-md-12">
      <GroupMenu></GroupMenu>
      <div id="buttons">
        <div class="input-group form-row">
          <div  class="col-md-4 col-md-offset-5" >
            <input type="button" class=" btn btn-info " value="成员申请"  v-on:click="getList(0)"/>
          </div>
          <div  class=" col-md-4 col-md-offset-5">
            <input type="button" class=" btn btn-success " value="文件管理" v-on:click="getList(1)"/>
          </div>
          <div  class="col-md-4 col-md-offset-5">
            <input type="button" class=" btn btn-danger" value="留言管理" v-on:click="getList(2)"/>
          </div>
        </div>
      </div>
      <div id="table_center">
        <div id="tables"  class="container"  >
            <table  class="table table-striped table-dark table-hover">
              <tbody>
              <tr  >
                <th id="theads" v-for="head in headlist[state]">{{head}}</th>
              </tr>
              <tr  v-for="item in items">
                <td v-if="state == 0">{{item.userName}}</td>
                <td v-if="state == 0">{{item.message}}</td>
                <td v-if="state == 0"><button class="btn btn-outline-success" @click="passsend(item)" >通過</button></td>
                <td v-if="state == 0"><button class="btn btn-outline-danger" @click="nopasssend(item)">不通過</button></td>

                <td v-if="state == 1">{{item.name}}</td>
                <td v-if="state == 1">{{item.size}}</td>
                <td v-if="state == 1">{{item.path}}</td>
                <td v-if="state == 1">{{item.updatetime}}</td>
                <td v-if="state == 1 && item.type != 0"><button class="btn btn-outline-danger" v-on:click="deleteFile" >delete</button></td>
                <td v-if="state == 1 && item.type == 0"></td>
                <td v-if="state == 2">{{item.message}}</td>
                <td v-if="state == 2">{{item.creatTime}}</td>
                <td v-if="state == 2"><button class="btn btn-outline-danger" @click="deleteMessage(item.id)">删除</button></td>
              </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TableGroupCenter from './TableGroupCenter'
  import {setCookie,getCookie} from "../js/CookieModel";
  import  GroupMenu from './GroupMenu'
  import  GroupOwner from '../js/TableOwner'
  import UserGroup from '../js/UserGroup'
  import UserController from '../js/UserController'
    export default {
        name: "GroupOwner",
        components: {TableGroupCenter,GroupMenu},
        data(){
          return{
            headlist:[
              ["成员","申请","状态",""],
              ["文件名","大小","路径","修改日期",""],
              ["message","日期",""],
              ],
            items:[],
            state :0,
            groupId:0,
            userId:0
          }
        },
        mounted :function () {
          let value = getCookie("user");
          if(value == null){
            this.$router.push({path:  '/login'});
            return
          }
          var json = JSON.parse(value);
          this.groupId = json.user.groupId;
          this.userId = json.user.id;
          // getList()
        },
        methods: {
          getList:function(vi){
            this.state =  vi;
            var groupowner = new GroupOwner();
            this.items = [];
            switch (vi){
              case 0:groupowner.getManList(this);break;
              case 1:groupowner.getGroupList(this);break;
              case 2:groupowner.getGroupMessage(this);break;
            }
          },
          deleteMessage:function (id) {
            var groupowner = new GroupOwner();
            groupowner.deleteMessage(this,id);
          },
          deleteFile:function(){
          },
          passsend:function (item) {
            let userController = new UserController();
            let userGroup = new UserGroup();
            var fd = new FormData();
            fd.append("id",item.userId);
            if(item.state == 11){
            fd.append("groupId",item.groupId);
            }
            else {
              fd.append("groupId",item.groupId);
            }
            userController.update(this,fd).then(result=>{
              if(result.data.isok){
                let fd = new FormData()
                fd.append("id",item.id)
                fd.append("state",33)
                fd.append("message","入群申请[通过] 时间："+new Date())
                userGroup.update(this,fd).then(result=>{
                  if(result.data.isok){
                    this.getList(0)
                  }
                })
              }
            })
          },
          nopasssend:function(item){
            let userGroup = new UserGroup();
            let fd = new FormData()
            fd.append("id",item.id)
            fd.append("state",44)
            fd.append("message","入群申请[失败] 时间："+new Date())
            userGroup.update(this,fd).then(result=>{
              if(result.data.isok){
                this.getList(0)
              }
            })
          },


        }

    }
</script>

<style scoped>
  #table_center{
    margin-top: 100px;
  }
  #buttons{
    display: table;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    margin-top: 100px;
  }
  .container{
    margin-top: 100px;
  }

  input[type="button"]{
    width: 200px;
  }

  #tables{
    display: block;
    overflow-y:scroll;
    height: 550px;

  }

</style>
