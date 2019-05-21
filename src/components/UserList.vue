<template>
  <tr>
    <td ><input type="checkbox"/>{{item.name}}</td>
    <td>{{item.application}}</td>

    <!--<td>{{item.updatetime}}</td>-->
    <td ><button class="btn btn-outline-light" type="submit">通过</button></td>
    <td ><button class="btn btn-outline-light" type="submit">不通过</button></td>
    <td></td>
  </tr>
</template>

<script>
    export default {
        name: "UserList",
        props:['item']
    }
</script>

<style scoped>
  td input[type="checkbox"]{
    float: left;
  }
</style>
