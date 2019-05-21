<template>
  <div  id="tables"  class="container "  >
    <table class="table table-striped table-dark table-hover">
      <thead>
      <tr >
        <th v-for="head in headlist">{{head}}</th>
      </tr>
      </thead>
      <tbody  v-for="item in items">
      <UserList  :item="item"></UserList>
      </tbody>
    </table>
  </div>
</template>

<script>
  import UserList from './UserList'
    export default {
        name: "TableGroupCenter",
        components:{UserList},
        data:function () {
          return{
            items: [
              {name:'201510098241',application:'加入',state:'通过',nstate:'不通过'},
              ],
            headlist:["成员","申请","状态",""],
          }
        }
      }
</script>

<style scoped>

</style>
