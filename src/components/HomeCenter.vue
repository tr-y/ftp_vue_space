<template>
  <div id="cardbody" class="card card-body-default alphagd">
    <div class="card-body">
      <!--<div class="card-header">-->
        <nav class="navbar  navbar-expand-lg">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

            <div  class="collapse navbar-collapse" id="navarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    上传
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <button class="dropdown-item"  v-on:click="modalresh(0)">上传文件</button>
                  </div>
                </li>
                <li  class="nav-item">
                  <button type="button" v-on:click="modalresh(2)" class="btn" data-toggle="modal" data-target="#folder_modal" style="color: #007bff">
                    新建文件夾
                  </button>
                </li>
                <li class="nav-item">
                  <button type="button" v-on:click="backlist" class="btn"  style="color: #007bff">
                    返回
                  </button>
                </li>


                <!--<ol class="breadcrumb alphagd" v-for="diritem in dir_list" >-->
                  <!--<li class="breadcrumb-item" :value="diritem.parentId"><a href="#">{{diritem.path}}</a></li>-->
                  <!--&lt;!&ndash;<li class="breadcrumb-item"><a href="#">Library</a></li>&ndash;&gt;-->
                  <!--&lt;!&ndash;<li class="breadcrumb-item active">Data</li>&ndash;&gt;-->
                <!--</ol>-->
              </ul>
              <div class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" v-model="searchName" type="search" placeholder="Search" aria-label="Search">
                <button v-if="king==0" class="btn btn-outline-success my-2 my-sm-0" v-on:click="searchByName">Search</button>
                <button v-if="king==1" class="btn btn-outline-success my-2 my-sm-0" v-on:click="groupSearchByName">Search</button>
              </div>
            </div>
          </nav>
      <TableCenter v-on="$listeners"   :king="king"  ref="tablecenter" :parentId="parentId" @setSubParent="setSubParent" ></TableCenter>
      </div>
    </div>
  <!--</div>-->
</template>

<script>
  import TableCenter from './TableCenter'
    export default {
      name: "HomeCenter",
      props:['userId','dir_list','king','parentId','groupId'],
      components: {TableCenter},
      data(){
        return{
          searchName:"",
          subParents:[],
          subparent :0
        }
      },
      methods:{
        getlist:function (userid,parentid) {
          this.$refs.tablecenter.getList(userid,parentid);
        },
        getGroupList:function(groupId,parentid){
          console.log("homecenter_groupID"+groupId)
          this.$refs.tablecenter.getGroupList(groupId,parentid);
        },
        modalresh:function (param) {
          this.$emit('childmodalresh',param);
        },
        searchByName:function () {
          this.$refs.tablecenter.searchByName(this.searchName,1)
        },
        searchByType:function (param) {
          this.$refs.tablecenter.searchByType(param,this.userId,1)
        },
        groupSearchByType:function (param) {
          this.$refs.tablecenter.groupSearchByType(param,this.groupId,1)
        },
        groupSearchByName:function () {
          this.$refs.tablecenter.groupSearchByName(this.searchName,1)
        }
        ,
        setSubParent:function (param) {
          this.subParents.push(param);
        },

        backlist:function () {
          var lenth = this.subParents.length;
          if(lenth == 0){
            return
          }
          else{
            if(this.king==0){

            this.getlist(this.userId, this.subParents.pop())
            }
            else{
              this.getGroupList(this.groupId,this.subParents.pop())
            }
          }

        }


        // getbackList:function () {
        //   this.$refs.tablecenter.getl();
        // }
      }
    }
</script>

<style scoped>
  #tables{
    position: relative
  }

  #cardbody{
    margin-top: 30px;
    height:600px;
    width:80%;
    margin-left: 50px;
  }
  .alphagd{
    background: rgba(255,255,255,0.2);
  }


  /*tbody tr{*/
    /*display: table;*/
    /*width: 100%;*/
  /*}*/
  /*table{*/
    /*border-spacing: 0;*/
    /*border-collapse:collapse;*/
    /*text-align: center;*/
  /*}*/




</style>
