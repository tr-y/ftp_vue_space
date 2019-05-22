<template>
  <div id="dropbox">
    <h2  v-if="files.length===0" class="center-t">将上传的文件拖到这里</h2>
    <div v-for="file in files">
      <h5 class="info_t">{{file.name}}</h5>
      <div class="progress">
        <div class="progress-bar progress-bar-striped" :style="{width:file.uploadPercentage}"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import SparkMD5 from 'spark-md5'
  import  FtpFile from '../js/FtpFile'
  import  FileGroup from '../js/FileGroup'
  export default {
    name: "UploadFile",
    props: ["user", "king","parentId","groupIds"],
    data() {
      return {
        files: [],
        parent: 0,
        path: "/",
        MD5:"",
        chunksSize:20971520,
        groupList:[],
        type:"",
        groupId :1,
        splitfile:"0"
      }
    },
    mounted: function () {
      var dropbox = document.querySelector('#dropbox');
      // this.getGroupList();
      dropbox.addEventListener('dragenter', this.onDrag, false);
      dropbox.addEventListener('dragover', this.onDrag, false);
      dropbox.addEventListener('drop', this.onDrop, false);
    },
    methods: {
      // queue:function(arr) {
      // var sequence = Promise.resolve()
      // arr.forEach(function (item) {
      //   sequence = sequence.then(item)
      // })
      //   return sequence
      // },
      addFile:function(param){
        this.axios.post("fileUser/upload", param).then(body => {
          this.result = body.data;
          if (this.result.isok) {
            alert("添加成功");
            addFileUser(file.name, file.size, retype)
          }
          else {
            alert("添加失败")
          }
        })
        },
      getMd5:function(file,that){
        var fileReader = new FileReader();
        spark = new SparkMD5();
        var blobSlice =File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
          file,
          chunkSize = 20971520,
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark;
        //每块文件读取完毕之后的处理
        fileReader.onload = function(e) {
          //每块交由sparkMD5进行计算
          var result = e.target.result;
          spark.appendBinary(result);
          currentChunk++;
          //如果文件处理完成计算MD5，如果还有分片继续处理
          if (currentChunk < chunks) {
            loadNext();
          } else {
            console.log("finished loading");
            that.MD5 = spark.end();
            that.checkMd5(file,that);
          }
        };
        function loadNext() {
          var start = currentChunk * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          fileReader.readAsBinaryString(blobSlice.call(file, start, end));
        }
        loadNext();
      },
      //TODO  checkMd5
      checkMd5:function(file,that){
        let md5 = this.MD5;
        console.log("獲取當前："+md5)
        let fd = {
          params: {
            fileId: md5,
          }
        }
        this.axios.get("ftpfile/isExist", fd).then((body) =>{
            let result = body.data;
            if(!result.isok){
              this.getGroupList(file,that,md5);
            }else{
              alert("該文件已存在");
            }
          }
        ).catch(function (error) {
          console.log(error);
        });
      },
      getGroupList:function(file,that,md5){
        let fd = {
          params: {
            groupId: that.groupId,
          }
        }
        this.axios.get("user/listGroup", fd).then((body) =>{
            var result = body.data;
            if(result.isok){
              this.groupList= result.data;
              that.uploadChunk(file,that,md5,that.parentId);
            }else{
              alert("不存在该用户组用户");
            }
          console.log()
          }
        ).catch(function (error) {
          console.log(error);
        });
      },
      uploadChunk:function(file,that,md5,parentId){
        let chunkSize = 1024*1024*20;
        let chunks = Math.ceil(file.size / chunkSize);
        let  fd;
        let  currentChunk = 0;
        let  name;
        let  start = 0;
        let  end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        let  blob;
        let fromList = new Array();
        let userList =that.groupList;
        while(currentChunk< chunks ){
          blob = file.slice(start,end);
          name = file.name +""+ currentChunk;
          console.log(userList[currentChunk]);
          fd = new FormData();
          fd.append('uploadFile',blob);
          fd.append('fileName', name);
          fd.append('currentChunk',currentChunk);
          fd.append('groupId', that.groupId);
          fd.append('userId',userList[currentChunk].id)
          fd.append('key',userList[currentChunk].userFtp.ftpId+"_"+userList[currentChunk].userFtp.ftp_pswd)
          fromList.push(fd);
          currentChunk++;
          start = currentChunk * chunkSize;
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        }
         let promiseAll =  fromList.map(function (data) {
          return  that.axios.post("filegroup/upload", data);
        })
          let ftpFile = new FtpFile();
          let b = file.type.split("/");
          let type = ftpFile.switchType(b[0]);
          that.addFile(md5,file,type,chunks,promiseAll,that,parentId)
      },

      addFile:function(md5,file,type,chunks,promiseAll,that,parentId){
        let fd = new FormData();
        fd.append("fileId",md5);
        fd.append("name",file.name);
        fd.append("type_id",type);
        fd.append("size",file.size);
        fd.append("create_time",new Date())
        fd.append("number",chunks);
        this.axios.post("ftpfile/add", fd).then(body => {
          let result = body.data;
          let fid = result.data;
          if(result.isok){
            Promise.all(promiseAll).then(function(resArr){
              resArr.forEach(function(res,i){
                let data = res.data.data
                console.log(i)
                that.addFileGroup(fid,file.name,data.userId,"/",type,data.currentChunk,0,file.size)
              })
            })
          }else {
            console.log("添加失败")
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //TODO addFileGroup`
      addFileGroup:function(fileId,name,userId,path,type,aias,parent,size){
       // var filegroup  =  new  FileGroup(fileId,this.groupId,name,userId,path,type,state,parent,size);
        let filegroup = {
          file_id : fileId,
          group_id:this.groupId,
          name: name,
          user_id:userId,
          path:path,
          type:type,
          aias:aias,
          parent:parent,
          size:size,
          updatetime:new Date()
        }
        this.axios.post("filegroup/add", filegroup).then(body => {
          let result = body.data;
          if(result.isok){
           alert("添加成功")
          }else {
            alert("添加失败")
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      addFileUser: function (name, size, type) {
        var user = this.user;
        var fd = {
          user_id: user.id,
          name: name,
          parent: this.parentId,
          type: type,
          updatetime: new Date(),
          size: size,
          path: this.path
        }
        this.axios.post("fileUser/add", fd).then(body => {
          var result = body.data;
          if(result.isok){
            console.log("添加成功")
          }else {
            console.log("添加失败")
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      // TODO uploadGroupFile总
      uploadGroupFile: function (file,that) {
        //文件每块分割20M，计算分割详情
       this.getMd5(file,that)
      },
      uploadUserFile: function (file,that) {
        var type = file.type
        var retype = 5
        var b = type.split("/")
        let  ftpFile = new FtpFile();
        retype = ftpFile.switchType(b[0])
        var item = {
          name: file.name,
          uploadPercentage: 0,
        };
        this.files.push(item);
        var fd = new FormData();
        fd.append('uploadFile', file);
        fd.append('fileName', item.name);

        let config = {
          onUploadProgress: e => {
            let completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
            item.uploadPercentage = completeProgress;
          }
        }
        this.axios.post("fileUser/upload", fd, config).then(body => {
          let result = body.data;
          if (result.isok) {
            alert("上传成功");
            that.addFileUser(file.name, file.size,retype );
          }
          else {
            alert("上传失败")
          }
        }).catch(function (error) {
          alert("上传失败");
        });
      },
      onDrag: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      onDrop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        var dt = e.dataTransfer;
        for (var i = 0; i !== dt.files.length; i++) {
          if(this.king==0) {
            this.uploadUserFile(dt.files[i],this);
          }
          else {
            // this.getGroupList();
            this.uploadGroupFile(dt.files[i],this)  //TODO 标注
          }
        }
      },
    },


  }
</script>

<style scoped>

  #dropbox{
    border: .25rem dashed #007bff;
    min-height:5rem;
  }

</style>
