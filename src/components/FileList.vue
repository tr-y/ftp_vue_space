<template>
  <tr>
    <td v-if="item.type>0"><input type="checkbox" name="rememberMe" :value="item.id" />{{item.name}}</td>
    <td v-else="item.type==0"><input type="checkbox" name="rememberMe" :value="item.id"/><a href="javascript:void(0)"style="color: deepskyblue"  v-on:click="getList">{{item.name}}</a> </td>
    <td v-if="item.size<=0">-</td>
    <td v-else>{{item.size}}</td>
    <td>{{item.updatetime}}</td>
    <td  v-if="item.type>0&& king == 1 "><button class="btn btn-outline-light" v-on:click="groupDownload">download</button></td>
    <td v-else ></td>
    <td  v-if="item.type>0&& king == 0 "><button class="btn btn-outline-light" v-on:click="download">download</button></td>
    <td v-else ></td>
    <td v-if="king == 0"><button class="btn btn-outline-danger" v-on:click="deleteFile" >delete</button></td>
    <td v-if="king == 1"><button class="btn btn-outline-danger" v-on:click="deleteGroupFile" >delete</button></td>
  </tr>
</template>

<script>
  import  FileGroup from '../js/FileGroup'
  export default {
    name: "FileList",
    props:["item",'king'],
    data(){
      return{

      }
    },
  methods:{
      deleteUserFile(){
       this.axios.delete( 'fileUser/delete?' + "id="+this.item.id+"&"+"parentId="+this.item.parent+"&"+"userId="+this.item.user_id).then(res=>{
         this.$emit('gets',this.item.user_id,this.item.parent);
    })},

      deleteGroupFile(){
       let filegroup  = new FileGroup();
        filegroup.delete(this);
        this.getList();
      },
      groupDownload(){
          let filegroup  = new FileGroup();
      },
    // deleteUserFile:function () {
    //   this.axios({
    //     method: 'post',
    //     url: 'fileUser/delete?' + "id="+this.item.id,
    //   })
    //     .then(function(response) {
    //       console.loglog(response);
    //     })
    //     .catch(function(response) {
    //       console.log(response);
    //     });
    // },
    deleteFile:function () {
     var that = this
      let formdata =  new FormData();
      formdata.append("name",this.item.name);
      this.axios({
        method: 'DELETE',
        url: '/files/delete',
        headers: {"Content-Type": "application/json"},
        data: formdata
        })
        .then(function() {
          console.log("测试")
          that.deleteUserFile();
        })
        .catch(function(response) {
          console.log(response);
        });
    },




    download:function () {
      let name = this.item.name
      // let config = {
      //   responseType: 'blob'
      // }
      let param = {
        params:{
          name:name
        }
      }
      this.axios({
        method:'get',
        url:'/fileUser/download',
        params:{'name':name},
        responseType:'blob'
      }).then((res)=>{
        const content  = res.data
        const blob =  new Blob([content])
        let objectUrl = URL.createObjectURL(blob)
        let downloadElement  =  document.createElement('a')
        downloadElement.href =  objectUrl
        downloadElement.download = name
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        URL.revokeObjectURL(href)
      }).catch(function (e) {
        console.log(e)
      })

    },
    getList:function () {
        //Todo 将itemid传送回去
        this.$emit('setSubParentId',this.item.parent)
      var id;
      if(this.king==0) {
        id=this.item.user_id;
      }
      else {
        id=this.item.group_id;
      }
        this.$emit('gets',id,this.item.id);
      },
    }
  }
</script>

<style scoped>
  td input[type="checkbox"]{
    float: left;
  }
</style>
