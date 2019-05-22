function UserController() {
}




UserController.prototype.update = function (that,user) {
  return that.axios.put("user/update",user)
}

export default UserController;
