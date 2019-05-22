<template>
  <div id="center">
    <div id="boths">
      <Headmennu :groupId="groupId" @gets="getChileList" :homeMennusize="homeMennusize">
      </Headmennu>
    </div>
    <div id="center_b" >
      <HomeVertical  @getHomeList="getHomeList"  @chiletype="homeType"></HomeVertical>
      <HomeCenter ref="homecenter" @setParentId="setParentId"  @childmodalresh="modalresh" :groupId="groupId"   :userId="userId" :king="king" :parentId="parentId"  :dir_list="dir_list"></HomeCenter>
    </div>

    <!--模态框-->
    <div class="modal fade" id="folder_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 v-if="childuploadstate==2" class="modal-title">文件夾</h4>
            <h4 v-if="childuploadstate==1" class="modal-title">上传文件夹</h4>
            <h4 v-if="childuploadstate==0" class="modal-title">上传文件</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="bs-example bs-example-form" role="form"  >
            <div class="row">
              <div class="col-md-12">
                <div  v-if="childuploadstate==2" class="input-group">
                  <input v-model="folad_name" style="margin: 25px" type="text" class="form-control col-md-offset-2" maxlength="10" placeholder="newfilename">
                </div>
                <div v-else>
                  <UploadFile :king="king" File :user="user" ref="uploadFile"></UploadFile>
                </div>
              </div>
            </div>
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button v-if="childuploadstate==2" class="btn btn-outline-success my-2 my-sm-0 " @click="createFold"    type="submit">创建</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import Headmennu from "./HeadMennu";
  import HomeVertical from "./HomeVertical";
  import HomeCenter from "./HomeCenter";
  import {getCookie} from "../js/CookieModel";
  import UploadFile  from  "./UploadFile"
  export default {
    name: "GroupHome",
    components: {HomeVertical, Headmennu,HomeCenter,UploadFile},
    data(){
      return {
        user:"",
        homeMennusize:20,
        parentId:0,
        userId:0,
        folad_name:"",
        path:'/',
        userlist:[],
        childuploadstate:0,
        king:1,
        groupId:0,
        dir_list:[
          // {"path":"/","parentId":0},
          // {"path":"ceshi/","parentId":1},
          // {"path":"ceshi/","parentId":1},
          // {"path":"ceshi","parentId":1}
        ]
      }
    },
    mounted :function(){
      let value = getCookie("user");
      if(value == null){
        this.$router.push({path:  '/login'});
        return
      }
      var json = JSON.parse(value);
      this.user = json.user
      console.log(this.user)
      this.groupId =this.user.groupId
      console.log("测试groupId"+this.groupId)
      if(this.groupId==null){
        return
      }
      this.homeMennusize = this.user.sharesize;
      this.getChileList(this.groupId,this.parentId);
    },
    methods: {
      createFold: function () {
        var fold = {
          params: {
            name: this.folad_name,
            parentId: this.parentId,
            groupId:this.groupId
          }
        }
        this.axios.get("filegroup/isNotExist", fold).then(body => {
          this.fold_exit = body.data.isok;
          if (!this.fold_exit) {
            alert("该文件已存在");
            return
          }
          var fileuser = {
            "user_id": this.userId,
            "name": this.folad_name,
            "parent": this.parentId,
            "group_id":this.groupId,
            "type": 0,
            "updatetime": new Date(),
            "size": 0,
            "path": this.path,
            "aias":0
          }
          this.axios.post("filegroup/add", fileuser).then(body => {
            $('#folder_modal').modal('hide');
            var result = body.data;
            if (result.isok) {
              alert("创建成功");
              this.getChileList(this.groupId, this.parentId);
            }
            else {
              alert("创建失败");
            }
          }).catch(function (error) {
            alert("创建失败");
            console.log(error);
          });
        }).catch(function (error) {
          console.log(error);
        });
      },

      modalresh: function (param) {
        this.childuploadstate = param;
        $('#folder_modal').modal('show');
      },
      getChileList(groupId, parentId) {
        this.$refs.homecenter.getGroupList(groupId, parentId);
      },
      homeType: function (param) {
        this.$refs.homecenter.groupSearchByType(param)
      },
      setParentId:function (parentId) {
        this.parentId = parentId
      },

      getHomeList:function () {
        this.getChileList(this.groupId,0)
      },
    }
  }


</script>




<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }
  #center{
    /*width: 1500px;*/
    height: 80%;
  }
  #center_b{
    /*border: solid 1px;*/
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    /*padding-top: 50px;*/
    float: left;
  }
  #boths{
    /*padding-top: 50px;*/
    padding-top: 80px;
  }

  .clear{
    clear: both;
  }


  #folder_modal{
    margin:auto 0px;
    padding-left: 500px;
    padding-top: 200px;
  }
</style>
