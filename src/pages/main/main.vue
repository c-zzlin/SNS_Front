<template>
	  <div id="container_body">
		  <Head></Head>
	<div class="container container_bg" id="container_main">
		<div class="row">
			<div class="col-sm-1"></div>
			<div class="col-sm-8 col-xs-12 my_edit" >
	<Send></Send>
		<Msg></Msg>
		</div>
		<Person></Person>
	</div>
	</div>
	<Foot></Foot>
	</div>
</template>

<script>
	import $ from 'jquery'
	import 'bootstrap/dist/js/bootstrap.min.js'
	import Head from '../../components/head/head.vue'
	import Foot from '../../components/foot/foot.vue'
	import Send from './send.vue'
	import Msg from './msg.vue'
	import Person from './person.vue'

	export default{
		components:{
			Head,
			Foot,
			Send,
			Msg,
			Person
		}
	}
</script>
<style scoped>
	@import url("bootstrap/dist/css/bootstrap.min.css");
.container_bg{
	background: #dd6572;
	background-color:rgba(255, 255, 255, 0.5);
	padding-bottom: 30px;
}
.my_edit{
    margin-top:80px;
}
</style>
