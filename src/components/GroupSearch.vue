<template>
  <div class="container">
      <div class="col-sm-12 col-md-12">
        <GroupMenu></GroupMenu>
        <div class="input-group mb-3">
          <input v-model="groupName" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" v-on:click="searchGroup()" type="search">search</button>
          </div>
        </div>
        <div id="table_center">
          <GroupTable  ref="groupTable" >
          </GroupTable>
        </div>
      </div>

  </div>
</template>

<script>
  import GroupTable from './GroupTable'
  import GroupMenu from './GroupMenu'
    export default {
      name: "GroupSearch",
      components: {GroupTable, GroupMenu},
      data(){
        return{
          groupName:""
        }
      },
      methods:{
       searchGroup:function () {
          this.$refs.groupTable.search(this.groupName);
         }
      }
    }
</script>

<style scoped>
  #table_center{
    margin-top: 100px;

  }
</style>
