function UserGroup() {

}

UserGroup.prototype.send =function (that,data) {
     return that.axios({
         method: 'post',
         url: "userGroup/add",
         data: data,
         headers: { 'Content-Type': 'application/json', },
       });
}

UserGroup.prototype.delete =function (that,data) {
  return that.axios({
    method: 'DELETE',
    url: "userGroup/delete",
    data: data,
    headers: { 'Content-Type': 'application/json', },
  });
}

UserGroup.prototype.update =function (that,data) {
  return that.axios.put("userGroup/update",data)
}

UserGroup.prototype.getList =function (that,param){
  return  that.axios.get('userGroup/list',param);
  }


export default UserGroup;
