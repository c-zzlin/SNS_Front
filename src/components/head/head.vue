<template>
	<div class="nav_head">
		<div class="left_head_nav">
			<img src="../../assets/img/insimg.png" height="50px" width="50px" class="img_log" />

		</div>
		<div class="hed_nav_font">
			<span class="font_logo"></span>
    </div>

		<div class="search">
			<input type="text" class="search__input" placeholder="Search" id="search_icon" v-model="data.search_input"
       @keyup.enter="search_friend()" v-on:click="search_block()" v-on:blur="search_none()" />

		</div>

		<div class="nav_right">
			<div class="nav_home" @click="query_msg_refresh" @mouseover="change1_zhuye" @mouseout="change2_zhuye">
				<img v-bind:src=data.zhuye_url height="40px" width="40px" class="icon" />
				<span class="li_circle" v-if="data.home>0">
					<span class="li_num">{{data.home}}</span>
				</span>
			</div>
      <!-- TODO 有私信消息时，在这个bar展示-->
			<div class="nav_home" @click="tiao" @mouseover="change1_sixin" @mouseout="change2_sixin">
				<img v-bind:src=data.sixin_url height="40px" width="40px" class="icon" />
        <span class="li_circle" v-if="data.pri>0">
					<span class="li_num">{{data.pri}}</span>
				</span>
			</div>
			<div class="nav_home" id="email_icon" v-on:mouseover="block()" v-on:mouseout="none()">
				<img v-bind:src=data.msg_url height="40px" width="40px" class="icon" />
        <span class="li_circle" v-if="data.push>0">
					<span class="li_num">{{data.push}}</span>
				</span>
				<div class="menu_ul" id="email" v-bind:class="data.flag==false?'display_none':'display_block'">
					<ul>
						<li @click="refresh_main">
							<div class="li_email">
								<p class="li_content">评论</p>
								<span class="li_circle" v-if="data.content>0">
									<span class="li_email_num">{{data.content}}</span>
								</span>
							</div>
						</li>
						<li @click="query_msg_refresh">
							<div class="li_email">
								<p class="li_content">点赞</p>
								<span class="li_circle" v-if="data.LIKE>0">
									<span class="li_email_num">{{data.LIKE}}</span>
								</span>
							</div>
						</li>
            <li @click="friend_commit">
            <div class="li_email">
              <p class="li_content">好友申请</p>
              <span class="li_circle" v-if="data.FRIEND>0">
									<span class="li_email_num">{{data.FRIEND}}</span>
								</span>
            </div>
          </li>
						<li @click="log_out">
							<div class="li_email">
								<p class="li_content">退出登录</p>

							</div>
						</li>


					</ul>
				</div>
			</div>
			<div class="nav_home" @click='redirect_person' @mouseover="change1_person" @mouseout="change2_person">
				<img v-bind:src=data.person_url height="40px" width="40px" class="icon" />
        <span class="li_circle" v-if="data.PERSON>0">
					<span class="li_num">{{data.PERSON}}</span>
				</span>
			</div>

		</div> '
	</div>
</template>

<script>

	import Vue from 'vue'
	import {mapActions, mapGetters} from 'vuex'
	import Bus from '../../config/bus.js'
	import {
		queryNavMsg,
    blog_refresh,
    blog_search,
    friend_unread,
    logout,
    chat_urcount
	} from '../../request/api.js'
	const data = {
		search_flag: false,
		flag: false,
		user: [],
		LIKE: 0,
		content: 0,
		pri: 0,
		home: 0,          //第一个BAR
    FRIEND:0,
    push:0,         //头部第三个Bar
    PERSON:0,       //最后一个BAR
		nav_msg: [],
    search_input:"",
    zhuye_url:'/static/bar/zhuye.png',
    sixin_url:'/static/bar/sixin.png',
    msg_url:'/static/bar/msg.png',
    person_url:'/static/bar/person.png'

	}
	export default {
		name: 'bigdiv',
		data() {
			return {
				data
			}
		},
    computed: {
      ...mapGetters(['user'])
    },
		methods: {
      change1_zhuye(){
        this.data.zhuye_url = '/static/bar/zhuye_blur.png'
      },
      change2_zhuye(){

        this.data.zhuye_url = '/static/bar/zhuye.png'
      },
      change1_person(){
        this.data.person_url = '/static/bar/person_blur.png'
      },
      change2_person(){
        this.data.person_url = '/static/bar/person.png'
      },
      change1_sixin(){
        this.data.sixin_url = '/static/bar/sixin_blur.png'
      },
      change2_sixin(){
        this.data.sixin_url = '/static/bar/sixin.png'
      }
      ,


      refresh_main(){
        this.data.push-=this.data.content;
        this.data.content = 0;              //后期考虑直接弹出对应的评论框
        this.$router.replace("/main_redirect")
      },
      pm_count(){
        let data = {
          user_id:this.user.user_id
        }
        chat_urcount(data).then(
          res=>{
            if(res.code == 200){
              this.data.pri = res.data;
            }
          }
        ).catch( err => console.log(err));
      },
		  log_out(){
		    let data={
		      token:this.user.token
        }
        logout(data).then(
          res=>{


          }
        ).catch( err => console.log(err));
        this.clear_user(null);
        this.$router.replace("/login");
      },
      search_urcount(){     //查找好友申请数量
        console.log(this.$route.path)
        if(this.$route.path == "/person"){
          this.data.FRIEND = 0
          this.data.push =0
          return;
        }
        let data={
          user_id:this.user.user_id
        }
        friend_unread(data).then(
          res=>{
            this.data.FRIEND=res.data;
            this.data.push+=res.data;
          }
        ).catch( err => console.log(err));
    },
      friend_commit(){
        data.push-=data.FRIEND
        data.FRIEND=0
        this.$router.push(
          {
            path:"/person_redirect",
            query:{
              to:3
            }
          }
        );
      },
      search_friend(){
        this.$router.push(
          {
            path:"/person_redirect",
            query:{
              to:1,
              search_input:this.data.search_input
            }
          }
        );
      },
			/**
			 * 跳转页面
			 */
			tiao: function() {
				/*
				 window.location.href="im.html"; */
				this.data.pri=0;
				this.$router.replace("/im")
			},
			redirect_person:function(){
			  data.PERSON = 0
				this.$router.push(
            {
              path:"/person_redirect",
              query:{
                to:2
              }
            }
        )
			}
			,
			block: function() {
        this.data.msg_url = '/static/bar/msg_blur.png'
				data.flag = true;
			},
			none: function() {
        this.data.msg_url = '/static/bar/msg.png'
				data.flag = false;
			},
			search_block: function() {
				data.search_flag = true;
			},
			search_none: function() {
				data.search_flag = false;
			},
			...mapActions(
				['query_nav_msg','get_user','clear_user']
			),query_myself: function() {
        let data={
          user_id:this.user.user_id
        }
        queryNavMsg(data).then(             //查询动态数量、好友数量
          res => {
            this.query_nav_msg(res.data)      //将动态数量，好友数量存入vuex
            this.initWebpack()                //连接websocket
          }).catch( err => console.log(err));
			},

			query_msg_refresh: function() {
			  let path=this.$route.path;
			  if(path == "/person"){
			    this.$router.replace("/")
          return;
        }
			  this.data.push-=this.data.LIKE
        this.data.LIKE = 0
        this.data.home = 0
        let data={
          user_id:this.user.user_id
        }
        blog_search(data).then(
          res=>{
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].msg_content = this.subs(res.data[i].msg_content)
            }
            Bus.$emit('msg',res.data);				//非父子组件传值
            Bus.$emit('flag', -1);
          }
        ).catch( err => console.log(err));

			},
			subs: function(con) {
				var lin = ''
				for (var i = 0; i < con.length; i++) {
					if (con.substr(i, 1) == '[') {
						var s = ''
						i++
						while (!(con.substr(i, 1) == ']')) {
							s += con.substr(i, 1)
							i++
						}
						lin += "<img src='" + s + "' style='width:25px;height:25px' >"
					} else {
						lin += con.substr(i, 1)
					}
				}
				return lin;
			},
			initWebpack() { //初始化websocket
				var wsuri = "ws://127.0.0.1:8766/ws/" + this.user.user_id+"/main";
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
				console.log(e.data)

				/*body.innerHTML+="<br/>"+aToStr[0].from+":"+aToStr[0].content;*/
				/*if(e.data=="LIKE"){
               	data.LIKE+=1
			   }else{
                   data.LIKE-=1}
                if(e.data=="content"){
		data.content+=1
}else{
                    data.content-=1
                }*/
				switch (e.data) {
          case 'PERSON':
            data.PERSON +=1;
            break;
					case 'LIKE':
						data.LIKE += 1;
            data.push +=1;
						break;
					case 'content':
						data.content += 1;
            data.push +=1;
						break;
					case 'home':
						data.home += 1;
						break;
          case 'FRIEND':
            data.push +=1;
            data.FRIEND +=1;
            break;

						break;
				}

			},
			websocketclose() { //关闭
				console.log("WebSocket关闭");
			},
			websocketerror() { //失败
				console.log("WebSocket连接失败");
			},
			change() {

				this.$http.post('/user/click', {
					emulateJSON: true
				}).then(function(res) {
					console.log(res)
				}, function(res) {
					console.log(res)
				})
			}

		},
		mounted: function() {
			this.query_myself()
      this.search_urcount()
      this.pm_count()
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.big_div {
		background: cornflowerblue;
		height: 800px;
		width: 100%;
		position: absolute;

	}

	.nav_head {
		z-index: 999;
		position: fixed;
		height: 70px;
		width: 100%;
		background: white;
    border-bottom: 1px whitesmoke solid;
	}

	.left_head_nav {
		float: left;
		margin-left: 10%;
		width: 50px;
		height: 70px;
	}

	.img_log {
		padding-top: 10px;
	}

	.hed_nav_font {
		text-align: center;
		margin-left: 2.5%;
		float: left;
		width: 200px;
		height: 70px;
	}

	.font_logo {
		display: block;
		position: relative;
		top: 25%;
		font: italic 2em Georgia, serif;
	}

	.search {
		float: left;
		margin-left: 20px;
	}

	.search__input {
		background-image: url(../../assets/img/t8TeL1S.png);
		background-size: 25px 25px;
		/*小图标的大小*/

		background-position: 5px 4px;
		/*小图标在input的位置*/

		background-repeat: no-repeat;
		/*背景小图标不重复*/

		padding: 8px 10px 8px 40px;
		/*设置input内边距*/

		/*设置input样式好看*/

		border: 1px solid #ddd;

		margin-top: 20px;
		margin-right: 20px;
		margin-left: 20px;

		width: 220px;
	}

	.nav_right {
		float: right;
		margin-right: 5%;
	}

	.nav_home {
		height: 50px;
		width: 70px;
		float: left;
		padding: 10px 20px 10px 20px;
	}

/*	.nav_home img:hover {
		background: lightgrey;
	}*/

	.li_circle {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		display: inline-block;
		background: #f30303;
		vertical-align: top;
	}

	ul {
		list-style: none;
	}

	.menu_ul {
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-right: 15px solid white;
	}

	.li_email {
		background: white;
		padding-top: 10px;
		height: 30px;
		width: 150px;
		margin-right: 20px;
	}

	.li_content {
		display: inline;
		margin-right: 50px;

	}

	#email li div:hover {
		background: lightgrey;
	}

	.search_div {
		background: white;
		margin-left: 20px;
		width: 220px;
	}

	.search_div li {
		width: 220px;
		height: 30px;
	}

	.search_div_p {
		color: indianred;
		padding: 5%;
		display: inline
	}

	.search_div_p span {
		margin-left: 10px;
	}

	.main {
		background: darkgrey;
		width: 100%;
		height: 90%;
	}

	.search_div_li :hover {
		background: antiquewhite;
	}


	.foot {
		position: absolute;
		background: whitesmoke;
		width: 100%;
		height: 100px;
	}

	.foot_bottom {
		width: 100%;
		height: 100px;
		background: lightgrey;
	}

	.foot_foot_list {
		margin-left: 40%;
	}

	.foot_foot_list dt {
		font-size: 16px;
		padding: 0 0 15px;
	}

	.display_block {
		display: block;
	}

	.display_none {
		display: none;
	}
</style>
