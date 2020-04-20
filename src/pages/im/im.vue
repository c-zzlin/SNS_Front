<template>
	<div id="bigdiv">
		<div class="demo">
			<div id="left_nav">
				<div id="header">
					<div class="user_w_f1">
						<div class="left_head">
							<img :src="this.user.user_image" @click="redirect_main" width="50" height="50" class="face" />
							<span class="user_name">{{this.user.user_aiais}}</span>
						</div>
						<div class="img_head">
							<img src="../../assets/img/msg.png" width="25px" height="25px" class="left_nav_head" />
							<img src="../../assets/img/funt.png" width="25px" height="25px" class="left_nav_head" />
						</div>
					</div>

				</div>

				<div class="search">
					<img src="../../assets/img/t8TeL1S.png" alt="" class="search__img" />
					<input type="text" class="search__input" placeholder="Search" />
				</div>


				<div id="list">
					<ul id="fre_list">
						<li v-for="(value,index) in Alldata.friend" @click='out(value,index)' v-bind:class="{li_click:index==Alldata.Active}">
							<div class="li_img">
								<img v-bind:src="value.user.user_image" width="50" height="50" />

							</div>
							<div class="li_name">
								<div class="time_name">
									<p class="name w_f1">
										<span class="li_username">{{value.user.user_aiais}}</span>

									</p>
									<p class="w_f2" v-if="value.lastMsg!=null">{{value.lastMsg.datetime}}</p>
								</div>
							</div>
							<div class="content_msg">
								<p class="somecontent" v-if="value.lastMsg!=null">{{value.lastMsg.content}}</p>
							</div>
							<div class="li_msg" v-if="value.sum!=0">
								<span class="li_circle">
									<span class="li_num">{{value.sum}}</span>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div id="right" v-if="Alldata.list.user_aiais!=null">
				<div id="right_head">
					<p class="topic_user">{{Alldata.list.user_aiais}}</p>
				</div>
				<div class="fenge"></div>
				<ul class="liuyan clearfix" id="main_talk2">
					<li v-for="(m,i) in Alldata.msg" v-bind:class="m.user_id==user.user_id?'ly_R clearfix':'ly_L clearfix'">

						<img v-if="m.user_id==user.user_id" v-bind:src="user.user_image" v-bind:class="m.user_id==user.user_id?'wx_head_r':'wx_head_l'" />
						<img v-else v-bind:src="Alldata.list.user_image" v-bind:class="m.user_id==user.user_id?'wx_head_r':'wx_head_l'" />

						<div v-bind:class="m.user_id==user.user_id?'ly_R_T':'ly_L_T'">
							<p><span>{{m.datetime}}</span>{{m.content}}</p>
						</div>
					</li>
				</ul>

				<div class="fenge"></div>
				<div class="text_mes">
					<textarea id="txt_area"></textarea>

				</div>
				<div class="btn">
					<button id="send_btn" @click='send()'>发送消息</button>
					<button id="close_btn">关闭</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueResource from 'vue-resource'
	import {
		imgBaseUrl
	} from '../../config/env.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
  import {
    chat_friend,
    chat_record,
    chat_send
  } from '../../request/api'

  Vue.use(VueResource)
	/* 	var url = window.location.href;
	function getUrlParam(url,name){
	    var pattern = new RegExp("[/&]" + name +"\([^&]+)","g");
	    var matcher = pattern.exec(url);
	    var items = null;
	    if(matcher != null){
	        try{
	            items = decodeURIComponent(decodeURIComponent(matcher[1]));
	        }catch(e){
	            try{
	                items = decodeURIComponent(matcher[1]);
	            }catch(e){
	                items = matcher[1];
	            }
	        }
	    }
	    return items;
	}

	var uid = getUrlParam(url,'im/'); */
	const Alldata = {
		friend: [],
		list: [],
		msg: [],
		Active: -1
	};

	export default {
		name: 'bigdiv',
		data() {
			return {
				Alldata,
				imgBaseUrl
			}
		},
		computed: {
			...mapGetters(['user'])
		},
		created() {
			this.initWebpack()
		},
		methods: {
      redirect_main(){
        this.$router.replace("/");
      },
			query_myfriend: function() { //获取好友列表
			  let data={
          user_id: this.user.user_id
        }
        chat_friend(data).then(
			    res=>{
            console.log(res)
            Alldata.friend=res.data
          }
        ).catch( err => console.log(err));
			},
			out: function(value, index) { //获取所有消息
				Alldata.msg = null
				Alldata.Active = index
				Alldata.list = value.user
				value.sum = 0 //点击就没有未读信
				Alldata.res = null
        let data={
          user_id: this.user.user_id,
          reply_id: Alldata.list.user_id
        }
        chat_record(data).then(           //查找聊天记录
          res=>{
            console.log(res)
            Alldata.msg = res.data
            this.$nextTick(function() { //聊天窗口始终保持最下
              var div = document.getElementById('main_talk2');
              div.scrollTop = div.scrollHeight;
            })
          }
        ).catch( err => console.log(err));
			},


			initWebpack() { //初始化websocket
				var wsuri = "ws://127.0.0.1:8766/ws/" + this.user.user_id+'/pm';
				this.websock = new WebSocket(wsuri); //这里面的this都指向vue
				this.websock.onopen = this.websocketopen;
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
				this.websock.onerror = this.websocketerror;
			},
			websocketopen() { //打开
				console.log("WebSocket连接成功")
			},
			websocketonmessage(e) { //数据接收
				console.log(e)
				var aToStr = e.data
        aToStr = JSON.parse(aToStr)
				console.log(aToStr)
				//body.innerHTML+="<br/>"+aToStr[0].from+":"+aToStr[0].content;
				var time = this.systemTime() //获取当前时间

				if (Alldata.Active != -1 && Alldata.friend[Alldata.Active].user.user_id == aToStr.from) {
					Alldata.msg.push({
						'content': aToStr.content,
						'user_id': aToStr.from,
						'datetime': time
					});
				}
				if (Alldata.friend.length > 1) { //判断有几个好友
					if (Alldata.Active != -1 && Alldata.friend[Alldata.Active].user.user_id == aToStr.from) {
						this.update()
					}
				}
				var j
				for (var i = 0; i < Alldata.friend.length; i++) {
					if (Alldata.friend[i].user.user_id == aToStr.from) {
						j = i
					}

				}
				if (Alldata.Active != j) { //不在发送消息者的界面，提示消息+1，更新提示内容
					Vue.set(Alldata.friend[j], 'sum', Alldata.friend[j].sum += 1)
					Vue.set(Alldata.friend[j].lastMsg, 'content', aToStr.content)

				} else { //正在接受到消息的人界面，更新好友列表的提示信息
					Vue.set(Alldata.friend[Alldata.Active].lastMsg, 'content', aToStr.content)
				}



			},
			websocketclose() { //关闭
				console.log("WebSocket关闭");
			},
			websocketerror() { //失败
				console.log("WebSocket连接失败");
			},
			send() {
				var msg = document.getElementById("txt_area").value; //获取输入框内容
				if (msg.length < 1)
					return;
				var to = Alldata.list.user_id;
				var from = this.user.user_id;
				/*this.websock.send(JSON.stringify({
						content: msg,
						to: to, //接收人,如果没有则置空,如果有多个接收人则用,分隔
						from: from
				})); //发送消息*/
				let data={
				  content:msg,
          to:to,
          from:from
        }
        chat_send(data).then(
          res=>{}
        ).catch( err => console.log(err));
				this.reset(); //清空输入框
				var time = this.systemTime() //获取当前时间
				Alldata.msg.push({
					'content': msg,
					'user_id': from,
					'datetime': time
				}); //将消息存入消息列表
				Vue.set(Alldata.friend[Alldata.Active].lastMsg, 'content', msg)
				this.update();
			},
			reset() {
				document.getElementById("txt_area").value = "";
			},
			update() {
				this.$nextTick(function() {
					var div = document.getElementById('main_talk2');
					div.scrollTop = div.scrollHeight;
				})
			},
			systemTime() { //获取系统时间 mm-dd hh:mm
				var date = new Date();
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var hh = date.getHours()
				var mm = date.getMinutes();
				var currentdate = month + seperator1 + strDate + " " + hh + ":" + mm;
				return currentdate;

			}

		},

		mounted: function() {
			/* 		    this.query_myselft(); */
			this.query_myfriend();
		}


	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;

	}

	#bigdiv {
		margin-top: 1%;
		height: 100%;
		width: 100%;
	}

	.demo {
		padding-left: 10%;
	}

	#left_nav {
		float: left;
		position: relative;
		width: 280px;
		background-color: #292b2e;
	}

	.left_nav_head {}

	.left_head {
		width: 150px;
		height: 70px;
		position: relative;
		float: left;
	}

	.img_head {
		float: right;
		position: relative;
		padding-top: 10px;
		height: 50px;
		width: 60px;
	}

	#header {
		height: 71px;
	}

	.user_w_f1 {
		position: relative;
		float: left;
		width: 280px;
		height: 70px;
	}

	.face {
		margin: 11px 15px 0 18px;
	}

	.user_name {
		color: #fff;
	}

	.search {
		height: 35px;
		padding: 12px 16px 0;
		border-bottom: 1px #404247 solid;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: rgb(64, 66, 71);
	}

	.search__img {
		float: left;
		height: 30px;
	}

	.search__input {
		text-align: center;
		top: -2px;
		width: 210px;
		height: 30px;
		line-height: 16px;
		border: 0;
		color: #fff;
		float: left;
	}

	#list {
		overflow: hidden;
		height: 603px;
	}

	.li_img {
		display: inline;
		float: left;
		padding-left: 20px;
		padding-top: 10px;
	}

	.clearfix {
		display: block;
	}

	.li_name {
		width: 200px;
		height: 30px;
		display: inline-block;
	}

	.li_username {
		padding: 0px 0px 0 30px;
		color: white;
	}

	#fre_list li {
		width: 280px;
		height: 75px;
		border-bottom: 1px #C3C8CD solid;
	}

	li {
		width: 300px;
		height: 75px;
	}

	ul {}

	.w_f1 {
		float: left;
	}

	.w_f2 {
		color: white;
		float: right;
	}

	.somecontent {
		color: grey;
		padding-left: 25px;
		display: inline;
		max-width: 50px;
	}

	.content_msg {
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: white;
	}

	#right {
		background-color: whitesmoke;
		width: 1000px;
		height: 617px;
		position: relative;
		float: left;
		border-right: 1px solid;
	}

	#right_head {
		border-top: 1px solid;
		width: 1000px;
	}

	.topic_user {
		line-height: 51px;
		color: black;
		text-align: center;
		height: 51px;
	}

	.fenge {
		width: 1000px;
		height: 30px;
		background-color: #E9EAF3
	}

	.text_mes {
		width: 999px;
		height: 155px;
	}

	#txt_area {
		width: 999px;
		height: 155px;
		BORDER-LEFT: 0px solid;
		BORDER-TOP: 0px solid;
		font-size: 28px;
	}

	#fre_list li:hover {
		background: #C0C0C0;
	}

	.btn {
		width: 100%;
		border-bottom: 1px solid;
		height: 43px;
		background: white;
	}

	#send_btn {
		width: 100px;
		height: 43px;
		float: right;
		background: #2FA8EC;
	}

	#close_btn {
		width: 100px;
		height: 43px;
		float: right;
		background: #404D5B;
	}

	.li_msg {
		display: inline;
		float: right;
		padding-right: 10px;
		color: red;
	}

	.li_circle {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		display: inline-block;
		background: #f30303;
		vertical-align: top;
	}

	.li_num {
		display: block;
		color: #FFFFFF;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}

	.liuyan {
		margin-top: 2%;
		padding: 3%;
		padding-bottom: 10px;
		height: 350px;
		overflow-y: scroll;
	}

	.ly_L {
		width: 100%;
		margin-bottom: 20px;
	}

	.ly_R {
		width: 100%;
		margin-bottom: 20px;
	}

	.ly_L_T {
		margin-left: 3%;
		float: left;
		max-width: 70%;
		margin-top: 15px;
	}

	.ly_R_T {
		margin-right: 3%;
		float: right;
		max-width: 70%;
		margin-top: 15px;
	}

	.wx_head_l {
		width: 40px;
		float: left;
	}

	.wx_head_r {
		width: 40px;
		float: right;
	}

	.ly_L_T span {
		display: inline-block;
		font-size: 13px;
		line-height: 1em;
	}

	.ly_R_T span {
		display: inline-block;
		font-size: 13px;
		line-height: 1em;
	}

	.ly_L p {
		display: block;
		background: #eaeaea;
		padding: 8px;
		border-radius: 5px;
		background: #1CC6AE;
		border: 0.5px;
		position: relative;
	}

	.ly_R p {
		display: block;
		background: #eaeaea;
		padding: 8px;
		border-radius: 5px;
		background: #1CC6AE;
		border: 0.5px;
		position: relative;
	}

	.ly_L P span {
		position: absolute;
		top: -15px;
		left: 0;
		color: #999;
		display: block;
		width: 150px;
	}

	.ly_R P span {
		position: absolute;
		top: -15px;
		right: 0;
		text-align: right;
		color: #999;
		display: block;
		width: 150px;
	}

	.ly_L p:before {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		overflow: hidden;
		border: 5px solid transparent;
		border-right-color: #1CC6AE;
		left: -11px;
		top: 13px;
	}

	.ly_L p:after {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		overflow: hidden;
		border: 5px solid transparent;
		border-right-color: #1CC6AE;
		left: -10px;
		top: 13px;
	}

	.ly_R p:before {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		overflow: hidden;
		border: 5px solid transparent;
		border-left-color: #1CC6AE;
		right: -10px;
		top: 13px;
	}

	.ly_R p:after {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		overflow: hidden;
		border: 5px solid transparent;
		border-left-color: #1CC6AE;
		right: -10px;
		top: 13px;
	}

	.clearfix {
		overflow: auto;
	}

	.li_click {
		background: lightgrey;
	}
</style>
