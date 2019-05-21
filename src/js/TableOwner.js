function TableOwner() {

}


TableOwner.prototype.getManList = function (that) {
    var param ={
      params:{
        groupId:that.groupId
      }
    }
    that.axios.get('userGroup/list',param).then(body=>{
      let data  = body.data
      if(data.isok){
          that.items = data.data;
          console.log(that.items)
      }
      else{
        that.items =[]
      }
    }
    ).catch(function (e) {
      console.log(e)
    })

}


TableOwner.prototype.getGroupMessage = function (that) {
  var param ={
    params:{
      groupId:that.groupId
    }
  }
  that.axios.get('groupMessage/list',param).then(body=>{
      let data  = body.data
      if(data.isok){
        that.items = data.data;
        console.log(that.items)
      }
      else{
        that.items =[]
      }
    }
  ).catch(function (e) {
    console.log(e)
  })

}

TableOwner.prototype.getMessageList = function (that) {

}


TableOwner.prototype.deleteMessage = function (that,id) {
  var param ={
    params:{
      id:id
    }
  }
  that.axios.delete('groupMessage/delete',param).then(body=>{
      let data  = body.data
      if(data.isok){
        TableOwner.prototype.getGroupMessage(that)
      }
    }
  ).catch(function (e) {
    console.log(e)
  })
}


TableOwner.prototype.getGroupList=function (that) {
  var lis = {
    params: {
      groupId: that.groupId,
      parentId: -1,
    }
  }

  that.axios.get("filegroup/find", lis).then(body => {
    var data = body.data;
    if (data.isok) {
      that.items = data.data;
    }
    else {
      that.items = []
    }
  }).catch(function (error) {
    console.log(error);
  });

}


export default TableOwner;
