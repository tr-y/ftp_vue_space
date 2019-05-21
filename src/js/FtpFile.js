function FtpFile() {
  // this.ftp_id = md5
  // this.name = name
  // this.type_id = type_id
  // this.size = size
}


FtpFile.prototype.getName = function () {
  return this.name
}
FtpFile.prototype.switchType = function (b) {
  var retype;
  switch (b) {
    case "text" :
      retype = 2;
      break;
    case "image":
      retype = 1;
      break;
    case "video":
      retype = 3;
      break;
    case "audio":
      retype = 4;
      break;
    default:
      retype = 5;
  }
  return retype;
}



export default FtpFile;
