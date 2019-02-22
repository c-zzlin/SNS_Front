<template>
	<div id="vue">
		<div class="row item_msg" v-for="(value,index) in data.list">
			<div class="col-sm-12 col-xs-12 message">
				<img src="../../assets/img/icon.png" class="col-sm-2 col-xs-2" style="border-radius: 50%">
				<div class="col-sm-10 col-xs-10">
					<span style="font-weight: bold;">Jack.C</span>
					<br>
					<small class="date" style="color:#999">1分钟前</small>
					<div class="msg_content">happy day!
						<img class="mypic" src="../../assets/img/bg_1.jpg">
					</div>

				</div>
				<div class="ul_msg">
					<ul class="ul_msg_ul">
						<li class="zhuanfa"><span><img src="../../assets/img/zhuanfa.png"><em class="little_number">123</em></span></li>
						<li class="pinglun" @click="shows(index)"><span><img src="../../assets/img/pinglun.png"><em class="little_number">123</em></span></li>
						<li class="line"><span><img src="../../assets/img/line.png"><em class="little_number">123</em></span></li>
						<li class="jubao"><span><img src="../../assets/img/zhuanfa.png"><em class="little_number">举报</em></span></li>
					</ul>
				</div>



			</div>



			<!--
    此评论textarea文本框部分使用的https://github.com/alexdunphy/flexText此插件
-->
			<div class="commentAll" id="comment_btn" v-bind:class="index==data.flag?'display_block':'display_none'">
				<!--评论区域 begin-->
				<div class="reviewArea clearfix">
					<textarea class="content comment-input" placeholder="Please enter a comment&hellip;" v-model="data.content[index]"></textarea>
					<a href="javascript:;" class="plBtn" @click="mes(index)">评论</a>
				</div>

				<!--评论区域 end-->
				<!--回复区域 begin-->
				<div class="comment-show">
					<div class="comment-show-con clearfix" v-for="(value,index) in data.ct">
						<div class="comment-show-con-img pull-left"><img src="images/header-img-comment_03.png" alt=""></div>
						<div class="comment-show-con-list pull-left clearfix">
							<div class="pl-text clearfix">
								<a href="#" class="comment-size-name">张三 : </a>
								<span class="my-pl-con">&nbsp;来啊 造作啊!</span>
							</div>
							<div class="date-dz">
								<span class="date-dz-left pull-left comment-time">2017-5-2 11:11:39</span>
								<div class="date-dz-right pull-right comment-pl-block">
									<a href="javascript:;" class="removeBlock">删除</a>
									<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a>
									<span class="pull-left date-dz-line">|</span>
									<a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>
								</div>
							</div>
							<div class="hf-list-con"></div>
						</div>
					</div>


				</div>
			</div>
			<!--回复区域 end-->
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	var data = {

		list: [
			'{1},{2}', '{3},{4}'
		],
		content: [],
		flag: -1,
		ct: ['{1}', '{2}']
	}
	export default {
		name: "vue",
		data() {
			return {
				data
			}
		},
		methods: {
			shows: function(index) {
				if (data.flag == index) {
					data.flag = -1
				} else {
					data.flag = index
				}
			},
			mes: function(index) {
				this.ct.push(3)
			}
		}
	}
</script>

<style scoped>
	@import url("bootstrap/dist/css/bootstrap.min.css");

	/*初始化样式*/
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	ul,
	li,
	a,
	div,
	p,
	span,
	table,
	tr,
	td,
	img {
		margin: 0;
		padding: 0;
	}

	ul {
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	img {
		outline: none;
		border: 0;
	}

	body {
		font-family: "Microsoft Yahei";
	}

	/*清除浮动*/
	.clearfix:before,
	.clearfix:after {
		content: " ";
		display: table;
	}

	.clearfix:after {
		clear: both;
	}

	.clearfix {
		zoom: 1;
	}

	/*浮动*/
	.pull-right {
		float: right !important;
	}

	.pull-left {
		float: left !important;
	}

	/*----------------------------------------------------------------------------------------------------------*/
	.content {
		float: left;
	}

	.flex-text-wrap,
	pre {
		margin: 0 !important;
	}

	.commentAll {
		width: 560px;
		padding: 20px;
		border: 1px solid #ededed;
		margin: 20px auto;
	}

	.plBtn {
		width: 75px;
		height: 36px;
		line-height: 36px;
		background-color: #339b53;
		text-align: center;
		display: block;
		float: right;
		color: #FFFFFF;
		font-size: 12px;
		border-radius: 6px;
		margin-right: 2px;
		margin-top: 20px;
	}

	.plBtn:hover {
		background-color: #2f904d;
	}

	/*----------评论区域 begin----------*/
	.comment-show {
		margin-top: 20px;
	}

	.comment-show-con {
		width: 100%;
		border-top: 1px solid #EDEDED;
		padding: 10px 0;
	}

	.comment-show-con-img {
		width: 48px;
		height: 48px;
		overflow: hidden;
		margin-top: 5px;
	}

	.comment-show-con-list {
		width: 85%;
		margin-left: 3%;
	}

	.pl-text {
		width: 100%;
		margin-top: 7px;
		word-wrap: break-word;
		overflow: hidden;
	}

	.date-dz {
		width: 100%;
		float: left;
	}

	.hf-list-con {
		float: left;
		width: 100%;
		background-color: #eaeaec;
		margin-top: 7px;
	}

	.comment-size-name {
		font-size: 12px;
		color: #339b53;
	}

	.my-pl-con {
		font-size: 12px;
		color: #8b8b8b;
		width: 100%;
	}

	.date-dz-left {
		font-size: 12px;
		color: #8b8b8b;
		display: block;
		padding-top: 18px;
	}

	.comment-time,
	.comment-pl-block {
		padding-top: 7px;
	}

	.comment-pl-block {
		margin-top: 0;
	}

	.date-dz-right {
		display: block;
		padding-top: 6px;
		padding-right: 18px;
		position: relative;
		overflow: hidden;
	}

	.removeBlock {
		float: left;
		font-size: 12px;
		color: #8b8b8b;
		margin-right: 24px;
		display: block;
		opacity: 0;
	}

	.hf-con-block {
		display: block;
	}

	.date-dz-pl,
	.date-dz-line,
	.date-dz-z {
		font-size: 12px;
		color: #8b8b8b;
	}

	.date-dz-line {
		display: block;
		padding: 0 20px;
	}

	.date-dz-z-click-red {
		width: 17px;
		height: 17px;
		display: block;
		float: left;
		background-image: url(../../assets/img/icon-all_01.png);
		background-repeat: no-repeat;
		background-position: -6px -198px;
		margin-right: 5px;
	}

	.z-num {
		font-style: normal;
	}

	.date-dz-z-click {
		color: #b83b44;
	}

	.red {
		background-position: -6px -119px !important;
	}

	.hf-pl {
		width: 70px;
		height: 30px;
		line-height: 30px;
		background-color: #339b53;
		text-align: center;
		display: block;
		float: right;
		color: #FFFFFF;
		font-size: 12px;
		border-radius: 6px;
		margin-right: 2px;
		margin-top: 20px;
	}

	.hf-con {
		width: 100%;
		margin-top: 24px;
	}

	.hf-input {
		font-size: 12px;
	}

	.all-pl-con {
		width: 96%;
		padding: 2% 0;
		float: left;
		margin: 0 2%;
	}

	.atName {
		font-size: 12px;
		color: #339b53;
	}

	.hfpl-text {
		margin-top: 0;
	}

	.date-dz:hover .removeBlock {
		opacity: 1;
	}

	.hf-list-con .all-pl-con {
		border-top: 1px solid #d9d9d9;
		padding-bottom: 12px;
	}

	.hf-list-con .all-pl-con:first-child {
		border-top: 0;
	}



	/*----------评论区域 end----------*/



	.upload_warp_img_div_del {
		position: absolute;
		top: 6px;
		width: 16px;
		right: 4px;
	}

	.upload_warp_img_div_top {
		position: absolute;
		top: 0;
		width: 100%;
		height: 30px;
		background-color: rgba(0, 0, 0, 0.4);
		line-height: 30px;
		text-align: left;
		color: #fff;
		font-size: 12px;
		text-indent: 4px;
	}

	.upload_warp_img_div_text {
		white-space: nowrap;
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.upload_warp_img_div img {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}

	.upload_warp_img_div {
		position: relative;
		height: 100px;
		width: 120px;
		border: 1px solid #ccc;
		margin: 0px 30px 10px 0px;
		float: left;
		line-height: 100px;
		display: table-cell;
		text-align: center;
		background-color: #eee;
		cursor: pointer;
	}

	.upload_warp_img {
		border-top: 1px solid #D2D2D2;
		padding: 14px 0 0 14px;
		overflow: hidden
	}

	.upload_warp_text {
		text-align: left;
		margin-bottom: 10px;
		padding-top: 10px;
		text-indent: 14px;
		border-top: 1px solid #ccc;
		font-size: 14px;
	}

	.upload_warp_right {
		float: left;
		width: 40%;
		margin-left: 2%;
		height: 100%;
		border: 1px dashed #999;
		border-radius: 4px;
		line-height: 130px;
		color: #999;
	}

	.upload_warp_left img {
		margin-top: 32px;
	}

	.upload_warp_left {
		float: left;
		width: 25%;
		height: 100%;
		border: 1px dashed #999;
		border-radius: 4px;
		cursor: pointer;
	}

	.upload_warp {
		margin-bottom: 2%;
		height: 100px;
	}

	.upload {
		border: 1px solid #ccc;
		background-color: #fff;
		width: 500px;
		box-shadow: 0px 1px 0px #ccc;
		border-radius: 4px;
	}

	.hello {
		width: 500px;
		margin-top: 5%;
		margin-left: 5%;
		text-align: center;
	}

	.ul_msg {
		float: left;
		margin-top: 40px;
		width: 580px;
		height: 50px;
	}

	.ul_msg_ul {
		width: 580px;
		height: 50px;
		text-align: center;

	}

	.ul_msg_ul li {
		border: 1px solid whitesmoke;
		float: left;
		width: 140px;
		line-height: 30px;
	}

	.ul_msg_ul li:hover {
		background: lightgrey;
	}

	.little_number {
		color: darkgrey;
	}








	/*style*/

	.message {
		background: #fff;
		height: 100%;
		margin-top: 5px;
		border: 1px solid #eee;
		padding: 15px;
	}

	.msg_content {

		margin-top: 10px;
	}




	.mypic {
		margin-top: 5px;
		width: 100%;
		height: 200px;
	}

	.mypic:hover {
		cursor: url('../../assets/img/enlarge.png'), auto;
	}

	.part_hot {
		background: #fff;
		margin-top: 5px;
		border: 1px solid #eee;
	}





	pre {
		white-space: pre;
		white-space: pre-wrap;
		word-wrap: break-word;
	}


	.display_block {
		display: block;
	}

	.display_none {
		display: none;
	}
</style>
