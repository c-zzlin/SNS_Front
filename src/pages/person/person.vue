<template>
  <div id="container_body">
    <Head></Head>
    <Friend></Friend>
    <Foot></Foot>
  </div>

</template>

<script>
import Vue from 'vue'
import Head from '../../components/head/head.vue'
import Friend from './friend.vue'
import Foot from '../../components/foot/foot.vue'

export default {
  name: 'person',
  components: {
    Head,
    Friend,
    Foot
  }
}
</script>

<style scoped>
  @import url("bootstrap/dist/css/bootstrap.min.css");

  .container_bg {
    background: #dd6572;
    background-color: rgba(255, 255, 255, 0.5);
    padding-bottom: 30px;
  }

  .my_edit {
    margin-top: 80px;
  }

  .row {
    height: 1000px;
    width: 100%;
  }
</style>
