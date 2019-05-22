function FileGroup(fileId,groupId,name,userId,path,type,state,parent,aias,size) {
  this.file_id = fileId
  this.group_id = groupId
  this.name = name
  this.user_id = userId
  this.path = path
  this.type = type
  this.state = state
  this.parent = parent
  this.aias = aias
  this.size = size
  this.updatetime = new Date();
}
function FileGroup() {
}

FileGroup.prototype.getName = function () {
  return this.name
}

FileGroup.prototype.delete = function (that) {

  // that.axios.get("findByFileId/").then(result=>{
  //
  // })
  let formdata =  new FormData();
  formdata.append("id",that.item.id);
  that.axios({
    method: 'DELETE',
    url: '/filegroup/delete',
    headers: {"Content-Type": "application/json"},
    data: formdata
  })
    .then(function() {
      console.log("测试")
        // that.deleteUserFile();
    })
    .catch(function(response) {
      console.log(response);
    });

  if(that.item.type != 0){
    deleteFtpFile(that)
  }


}

FileGroup.prototype.deleteFtpFile= function (that) {

  // that.axios.get("findByFileId/").then(result=>{
  //
  // })
  let formdata =  new FormData();
  formdata.append("fileId",that.item.fileId);
  that.axios({
    method: 'DELETE',
    url: '/ftpfile/delete',
    headers: {"Content-Type": "application/json"},
    data: formdata
  })
    .then(function() {
      console.log("测试")
      // that.deleteUserFile();
    })
    .catch(function(response) {
      console.log(response);
    });
}



export default FileGroup;
