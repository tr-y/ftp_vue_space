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


FileGroup.prototype.getName = function () {
  return this.name
}




export default FileGroup;
