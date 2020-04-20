<template>
	<div id="msgList">
		<div class="row item_msg" v-for="(value,index) in Alldata.msg">
			<div class="col-sm-12 col-xs-12 message">
				<img :src="value.user_image" class="col-sm-2 col-xs-2" style="border-radius: 50%">
				<div class="col-sm-10 col-xs-10">
					<span style="font-weight: bold;">{{value.user_aiais}}</span>
					<br>
					<small class="date" style="color:#999">{{value.create_time}}</small>
					<div class="msg_content">
						<span v-html="value.msg_content"></span>
						<!--   <div v-for="(v,i) in value.messageImg)">
                                <img class="mypic" v-bind:src="v.mimages">

                           </div>-->
						<img class="mypic" v-for="(v,i) in value.img_group" :src="imgBaseUrl+v.img_url">
					</div>
				</div>
				<div class="ul_msg">
					<ul class="ul_msg_ul">
						<li class="zhuanfa"><span><img src="../../assets/img/zhuanfa.png"><em class="little_number">0</em></span></li>
						<li class="pinglun" @click="show_coment(index,value.msg_id)"><span><img src="../../assets/img/pinglun.png"><em class="little_number">{{value.comment}}</em></span></li>
						<li class="line" @click="Like(value.is_like,index,value.msg_id,user.user_id,value.user_id)"><span><img src="../../assets/img/line.png"><em
								 v-bind:class="value.is_like==1?'li_like':'littel_numer'">{{value.like}}</em></span></li>
						<li class="jubao"><span><img src="../../assets/img/zhuanfa.png"><em class="little_number">举报</em></span></li>
					</ul>
				</div>


			</div>
			<!--
                 此评论textarea文本框部分使用的https://github.com/alexdunphy/flexText此插件
                 -->
			<div class="commentAll" id="comment_btn" v-bind:class="index==Alldata.flag?'display_block':'display_none'">
				<!--评论区域 begin-->
				<div class="reviewArea clearfix">
					<textarea class="content comment-input" placeholder="Please enter a comment&hellip;" v-model="Alldata.content"></textarea>
					<a href="javascript:;" class="plBtn" @click="send_content(index)">评论</a>
				</div>


				<!--评论区域 end-->
				<!--回复区域 begin-->
				<div class="comment-show" v-if="Alldata.contents!=''">
					<div class="comment-show-con clearfix" v-for="(c,j) in Alldata.contents">
						<div class="comment-show-con-img pull-left"><img :src="c.user_image" width="50px" heigth="50px"></div>
						<div class="comment-show-con-list pull-left clearfix">
							<div class="pl-text clearfix">
								<a href="#" class="comment-size-name">{{c.user_aiais}} : </a>
								<span class="my-pl-con">&nbsp;{{c.content}}</span>
							</div>
							<div class="date-dz">
								<span class="date-dz-left pull-left comment-time">{{c.create_time}}</span>
								<div class="date-dz-right pull-right comment-pl-block">
									<a href="javascript:;" class="removeBlock">删除</a>
									<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" @click="show_reply(j,c.user_aiais)">回复</a>
									<span class="pull-left date-dz-line">|</span>
									<a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>
								</div>
								<div class="hf-con pull-left" v-bind:class="Alldata.show_reply_input==j?'display_show':'display_none'">
									<textarea class="content_son" placeholder="" v-model="Alldata.reply"></textarea> <a href="javascript:;" class="hf-pl"
									 @click="reply(value.msg_id,c.user_id,user.user_id,c.comment_id,j)">评论</a></div>
							</div>

							<div class="all-pl-con" v-for="(d,q) in c.list">
								<div class="pl-text hfpl-text clearfix">
									<a href="#" class="comment-size-name">{{d.user_aiais}} : </a>
									<span class="my-pl-con">{{d.content}}</span></div>
								<div class="date-dz"> <span class="date-dz-left pull-left comment-time">{{d.create_time}}</span>
									<div class="date-dz-right pull-right comment-pl-block">
										<a href="javascript:;" class="removeBlock">删除</a>
										<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" @click="show_child_reply(j,q,d.user_aiais)">回复</a>
										<span class="pull-left date-dz-line">|</span>
										<a href="javascript:;" class="date-dz-z pull-left">
											<i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> </div>
								</div>

								<div class="hf-con pull-left" v-bind:class="(Alldata.reply_index==q && Alldata.child_reply_index==j)?'display_show':'display_none'">
									<textarea class="content_son" placeholder="" v-model="Alldata.child_reply"></textarea>
									<a href="javascript:;" class="hf-pl" @click="child_reply(value.msg_id,d.user_id,user.user_id,d.comment_id,j)">评论</a></div>
							</div>




							<div class="hf-list-con"></div>
						</div>
					</div>
				</div>
			</div>

		</div>


	</div>
</template>

<script>
	import Vue from 'vue'
	import {imgBaseUrl} from '../../config/env.js'
		import {
		mapActions,
		mapGetters
	} from 'vuex'
  import {
    blog_search,
    comment_search,
    comment_insert,
    reply_insert,
    reply_child_insert,
    blog_like
  }from '../../request/api.js'
	import Bus from '../../config/bus.js'

	   var Alldata = {
            imgList: [],						//选中图片
            size: 0,								//图片张数
            content_send: "",							//发布内容时传到后台的值（包含文字表情）
            length: 0,								//截取字符串和表情
            file: '',
            msg: [],
            flag:-1,
            contents:[],
            content:'',
            show_reply_input:-1,
            reply:'回复:@',
            reply_index:-1,
            child_reply:'回复:@',
            child_reply_index:-1                       //记录二维列表
        }
	export default {
		name: "msgList",
		data() {
			return {
				Alldata,
				imgBaseUrl
			}
		},
			computed: {
			...mapGetters(['user'])
		},
		methods: {
		 child_reply:function(msg_id,reply_id,user_id,comment_id,j){//添加子回复
                    var myDate = new Date();
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var now=month+"-"+date+" "+h+':'+m;
                    let data={
                      msg_id:msg_id,
                      reply_id:reply_id,
                      user_id:user_id,
                      content:Alldata.child_reply,
                      comment_id:comment_id
                    }

                    reply_insert(data).then(
                      res=>{
                        console.log(res)
                        Alldata.contents[j].list.unshift(
                            {
                                content:Alldata.child_reply,
                                user_id:user_id,
                                create_time:now,
                                reply_id:reply_id,
                                comment_id:comment_id,
                                user_aiais:this.user.user_aiais,
                                user_image:this.user.user_image
                            }
                        )

                        Alldata.child_reply='回复:@'
                        Alldata.reply_index=-1
                        Alldata.child_reply_index=-1
                      }
                    ).catch( err => console.log(err));
                    /* this.$http.post('/Msg/insert_reply',
                        {msg_id:msg_id,reply_id:reply_id,user_id:user_id,content:Alldata.child_reply,comment_id:comment_id}, {emulateJSON: true}).then(function (res) {
                        console.log(res)
                        Alldata.contents[j].list.unshift(
                            {
                                content:Alldata.child_reply,
                                user_id:user_id,
                                create_time:now,
                                reply_id:reply_id,
                                comment_id:comment_id,
                                uname:this.user.uname
                            }
                        )

                        Alldata.child_reply='回复:@'
                        Alldata.reply_index=-1
                        Alldata.child_reply_index=-1
                    }, function (res) {
                        console.log(res);
                    }) */
                }
                ,
                show_child_reply:function(j,q,name){    //展示子回复框

                    Alldata.child_reply+=name+":"
                    if(Alldata.reply_index==q){
                        Alldata.child_reply='回复:@'
                        Alldata.child_reply_index=-1
                        Alldata.reply_index=-1                              //隐藏
                    }else{
                        Alldata.child_reply_index=j
                        Alldata.reply_index=q
                    }
                }
                ,
                reply:function(msg_id,reply_id,user_id,comment_id,j){     //回复评论
                    var myDate = new Date();
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var now=month+"-"+date+" "+h+':'+m;
                    let data={
                      msg_id:msg_id,
                      reply_id:reply_id,
                      user_id:user_id,
                      content:Alldata.reply,
                      comment_id:comment_id
                    }
                    reply_insert(data).then(
                      res=>{
                        console.log(res)
                        Alldata.contents[j].list.unshift(
                            {
                                    content:Alldata.reply,
                                    user_id:user_id,
                                    create_time:now,
                                    reply_id:reply_id,
                                   comment_id:comment_id,
                                user_aiais:this.user.user_aiais,
                                user_image:this.user.user_image
                            }
                        )

                            this.Alldata.reply='回复:@'
                            this.Alldata.show_reply_input=-1
                      }
                    ).catch( err => console.log(err));
                    /* this.$http.post('/Msg/insert_reply',
                        {msg_id:msg_id,reply_id:reply_id,user_id:user_id,content:Alldata.reply,comment_id:comment_id}, {emulateJSON: true}).then(function (res) {
                        console.log(res)
                    Alldata.contents[j].list.unshift(
                        {
                                content:Alldata.reply,
                                user_id:user_id,
                                create_time:now,
                                reply_id:reply_id,
                               comment_id:comment_id,
                            user_aiais:this.user.user_aiais
                        }
                    )

                        this.Alldata.reply='回复:@'
                        this.Alldata.show_reply_input=-1
                    }, function (res) {
                        console.log(res);
                    }) */
                },
                show_reply:function(j,name){        //展示回复框
                    this.Alldata.reply+=name
                    if(this.Alldata.show_reply_input==j){
                        this.Alldata.reply='回复:@'+":"
                        this.Alldata.show_reply_input=-1
                    }else{
                         this.Alldata.show_reply_input=j
                    }
                },
                send_content:function(index){       //发表评论
                    var myDate = new Date();
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var now=month+"-"+date+" "+h+':'+m;
                    alert(Alldata.contents.length+1)
                    let data={
                      content:Alldata.content,
                      user_id:this.user.user_id,
                      msg_id:Alldata.msg[index].msg_id,
                      friend_id:Alldata.msg[index].user_id
                    }
                    comment_insert(data).then(
                          res=>{
                            console.log(res)
                            Alldata.contents.push({
                                content:Alldata.content,
                                create_time:now,
                                user_image:this.user.user_image,
                                user_aiais:this.user.user_aiais,
                                user_id:this.user.user_id,
                                comment_id:res.data,
                                list:[]
                            })
                            Alldata.content=''
                          }
                    ).catch( err => console.log(err));
                   /* this.$http.post('/Msg/insert_content',
                    {

                    content:Alldata.content,
                    user_id:this.user.user_id,
                    msg_id:Alldata.msg[index].msg_id,
                    },
                    {emulateJSON: true}).then(function (res) {
                        console.log(res)

                        Alldata.contents.push({
                            content:Alldata.content,
                            create_time:now,
                            user_image:this.user.user_image,
                            user_aiais:this.user.user_aiais,
                            user_id:this.user.user_id,
                            list:[]
                        })
                        Alldata.content=''
                    }, function (res) {
                        console.log(res);
                    }) */
                },
                show_coment:function(index,msg_id){     //查评论
                   /* this.$http.post('/Msg/query_contentbyMid', {msg_id:msg_id},{emulateJSON: true}).then(function (res) {
                       console.log(res)
                        this.Alldata.contents = res.data.data
                    }, function (res) {
                        console.log(res);
                    }) */
                  if(this.Alldata.flag==index){
                    this.Alldata.flag=-1
                    return;
                  }else{
                    this.Alldata.flag=index
                  }
                    let data={
                      msg_id:msg_id,
                      user_id:this.user.user_id
                    }
                    comment_search(data).then(
                    res=>{
                      console.log(res)
                       this.Alldata.contents = res.data
                    }).catch( err => console.log(err));

                    },
                query_msg_all: function () {     //查询所有动态

                    /* this.$http.post('/Msg/query_msg_all', {emulateJSON: true}).then(function (res) {
                        console.log(res.data);
                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].msg_content = this.subs(res.data[i].msg_content)
                        }
                        Alldata.msg = res.data
                    }, function (res) {
                        console.log(res);
                    }) */
                    let data={
                      user_id:this.user.user_id
                    }
                    blog_search(data).then(
                      res=>{
                        console.log(res.data);
                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].msg_content = this.subs(res.data[i].msg_content)
                        }
                        Alldata.msg = res.data
                      }
                 ).catch( err => console.log(err));
                },
                subs: function (con) {
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
                Like: function (is_like, index,msg_id,user_id, friend_id) {

                      let data={
                        is_like: is_like,
                        msg_id: msg_id,
                        user_id: user_id,
                        friend_id: friend_id
                      }
                      blog_like(data).then(
                        res=>{
                          console.log(res.data);
                          if (is_like == 0) {
                              this.Alldata.msg[index].is_like = 1
                              this.Alldata.msg[index].like += 1
                          }
                          else if (is_like == 1) {
                              this.Alldata.msg[index].is_like = 0
                              this.Alldata.msg[index].like -= 1
                          }
                        }
                      ).catch( err => console.log(err));
                   /* this.$http.post('/Msg/update_addLike', {
                        is_like: is_like,
                        index: index,
                        msg_id: msg_id,
                        user_id: user_id,
                        friend_id: friend_id
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res.data);
                        if (res.data == 1) {
                            this.Alldata.msg[index].is_like = 1
                            this.Alldata.msg[index].like += 1
                        }
                        else if (res.data == 0) {
                            this.Alldata.msg[index].is_like = 0
                            this.Alldata.msg[index].like -= 1
                        }
                    }, function (res) {
                        console.log(res);
                    })
 */

                }
            },
            mounted: function () {
				 Bus.$on('msg',function(val){//监听first组件的txt事件
					Alldata.msg=val;
    });
                this.query_msg_all()

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
.li_like{
    color: red;
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
