function FGroup(){

}

FGroup.prototype.getList = function (that) {
  var list = null;
  that.axios.get("fgroup/find").then(body => {
    var result = body.data;
    if (result.isok){
      list  =   result.data
      that.items = list;
    }
    // else {
    //   alert("无法获取数据");
    // }
  }).catch(function (error) {
    alert("获取失败");
    console.log(error);
  });
}

FGroup.prototype.join = function (that,id,userId,groupId) {
  var fd = new FormData();
  fd.append("id",id);
  fd.append("userId",userId)
  fd.append("groupId",groupId);
  that.axios.put("user/update",fd).then(body => {
    var result = body.data;
    if (result.isok){
      alert("加入成功")
    }
    // else {
    //   alert("无法获取数据");
    // }
  }).catch(function (error) {
    alert("获取失败");
    console.log(error);
  });
}

FGroup.prototype.search = function (that,groupName) {
  var fd  = {
      params: {
        name: groupName,
      }
  };
  that.axios.get("fgroup/search",fd).then(body => {
    var result = body.data;
    if (result.isok){
        that.items = result.data;
    }
    else{
      that.items = "";
    }
  }).catch(function (error) {
    alert("获取失败");
    console.log(error);
  });
}

FGroup.prototype.creat =function (that,fGroup) {
 return that.axios.post("fgroup/build",fGroup)
}

export default FGroup;
