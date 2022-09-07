<template>
  <List></List> 
</template>

<script>
import List from "./components/List.vue"
export default {
  name: 'App',
  components: {
    List,
  }
}
</script>

<style lang="less">
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
body,html{
  font-family: "Times New Roman", Times, serif;
  height:100%;  
  width:100%;
  background: url(./assets/对开本.jpg) no-repeat;
}
</style>
