<template>
  <div  id="tables"  class="container"  >
    <table class="table table-striped table-dark table-hover">
      <thead>
      <tr >
        <th v-for="head in headlist">{{head}}</th>
      </tr>
      </thead>
      <tbody  v-for="item in items" >
      <FileList  :king="king"  @gets="getList" @setSubParentId="setSubParent"  :userId="userid" v-bind="parentId" ref="tests"  v-if="state==0" :item="item"></FileList>
      <UserList v-if="state==1" :item="item"></UserList>
      </tbody>
    </table>
  </div>

</template>

<script>
  import Form from "bootstrap-vue/src/mixins/form";
  import FileList from "./FileList"
  export default {
    getParentIdname: "TableCenter",
    components: {Form,FileList},
    props:['king'],
    data() {
      return {
        title_message: "register",
        rol: 0,
        state:0,
        items: [],
        userid:1,
        headlist:["文件名","大小","修改日期"],
        parentId:0,
        item:{},
      }
    },
    methods:{
      getList :function (id,parentId) {
        this.setParentId (parentId) ;
       if(this.king==0){
         this.getUserList(id,parentId);
         return
       }
       else{
         this.getGroupList(id,parentId);
       }
      },
      getUserList:function(userId,parentId){
        var lis = {
          params: {
            userId: userId,
            parentId: parentId,
          }
        }
        // console.log(userId+" "+parentId)
        this.axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
        this.axios.get("fileUser/getListUser",lis).then(body=>{
          this.result = body.data;
          this.items = this.result.data;
          console.log(this.items)
        }).catch(function (error) {
          console.log(error);
        });
      },
      getGroupList:function (groupId,parentId) {
        var lis = {
          params: {
            groupId: groupId,
            parentId: parentId,
          }
        }
        console.log('groupid:'+groupId)
        console.log('parent:'+parentId)
        this.axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
        this.axios.get("filegroup/find",lis).then(body=>{
          this.result = body.data;
          this.items=""
          if(this.result.isok){
            this.items = this.result.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      creatDir:function () {
        var formdata = new FormData();
        formdata.append("userId",userId);
        formdata.append("name",name),
          this.axios.post("fileUser/buildFile",lis).then(body=>{
            var result = body.data;
            this.items = result.data;
          }).catch(function (error) {
            console.log(error);
          });
      },
      searchByName:function (name,userId) {
        var list = {
          params: {
            order: name,
            userId: userId,
            state :0
          }
        }
        if(name !=""&& name!=null){
          this.axios.get("fileUser/search",list).then(body=>{
            var result = body.data;
            this.items = result.data;
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      searchByType:function (type,userId) {
        var list = {
          params: {
            order: type,
            userId: userId,
            state : 1,
          }
        }
          this.axios.get("fileUser/search",list).then(body=>{
            var result = body.data;
            this.items = result.data;
          }).catch(function (error) {
            console.log(error);
          });
      },
      groupSearchByType:function (type,groupId) {
        var list = {
          params: {
            order: type,
            groupId: groupId,
            state : 1,
          }
        }
        this.axios.get("filegroup/search",list).then(body=>{
          var result = body.data;
          this.items=""
          if(result.isok){
            this.items = result.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      groupSearchByName:function (name,groupId) {
        var list = {
          params: {
            order: name,
            groupId: groupId,
            state :0
          }
        }
        if(name !=""&& name!=null){
          this.axios.get("filegroup/search",list).then(body=>{
            var result = body.data;
            this.items = "";
            if(result.isok) {
              this.items = result.data;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      setSubParent:function(param){
        this.$emit('setSubParent',param);
      },
      // getParentId:function(){
      //   // var list = {
      //   //   params: {
      //   //     id:  this.$refs.tests.parent
      //   //   }
      //   // }
      //   //   if(list.params.id==0){
      //   //       return
      //   //   }
      //   //   console.log(this.parentId)
      //     this.axios.get("/fileUser/getByParentId"+"?id="+ this.parentId).then(body=>{
      //       var result = body.data;
      //       if(result.isok){
      //         this.parent = result.data;
      //         this.getList(this.userid,this.parent);
      //       }
      //     }).catch(function (error) {
      //       console.log(error);
      //     });
      //
      // },
      setParentId:function (param) {
        this.$emit("setParentId",param)
      }
    }

  }

</script>

<style scoped>
  #tables{
    display: block;
    overflow-y: scroll;
    height: 450px;
  }

</style>
