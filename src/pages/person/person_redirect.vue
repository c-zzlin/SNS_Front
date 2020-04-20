<template>
</template>

<script>
  import Vue from 'vue'
 export default{
 	mounted(){
    let to = this.$route.query.to
    if(to==1){
 		this.$router.push(
       {
         path:"/person",
         query:{
           to:1,
           search_input:this.$route.query.search_input
         }
       }
    )
 	}else{
    this.$router.push(
       {
         path:"/person",
         query:{
           to:to
         }
       }
    )
  }
 }}
</script>

<style>
</style>
