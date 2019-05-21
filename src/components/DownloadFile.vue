<template>
  <div>
    <div><input type="button"  v-on:click ="te()" value="测试"/></div>
  </div>

</template>

<script>
  export default {
    name: "DownloadFile",
    data(){
      return{
        filename :'hello.txt',
        result:"",
        content:""
      }
    },
    methods:{
      te: async function() {
        fetch('http://localhost:1433/file/gets',{
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res =>res.blob())
          .then(data=>{
            let blobUrl = window.URL.createObjectURL(data);
            this.download(blobUrl);
          });
      },
      download:function(bobUrl){
        const a  =document.createElement('a');
        a.style.display="none";
        a.download = '软件测试.rar';
        a.href = bobUrl ;
        a.click();

        // document.body.removeChild(a);
      }


    }
  }
</script>

<style scoped>

</style>
