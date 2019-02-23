<template>
	<div id="msgList">
		<div class="row item_msg" v-for="(value,index) in Alldata.msg">
			<div class="col-sm-12 col-xs-12 message">
				<img :src="imgBaseUrl+value.uimage" class="col-sm-2 col-xs-2" style="border-radius: 50%">
				<div class="col-sm-10 col-xs-10">
					<span style="font-weight: bold;">{{value.uname}}</span>
					<br>
					<small class="date" style="color:#999">{{value.mdatetime}}</small>
					<div class="msg_content">
						<span v-html="value.mcontent"></span>
						<!--   <div v-for="(v,i) in value.messageImg)">
                                <img class="mypic" v-bind:src="v.mimages">

                           </div>-->
						<img class="mypic" v-for="(v,i) in value.messageImg" :src="imgBaseUrl+v.mimages">
					</div>
				</div>
				<div class="ul_msg">
					<ul class="ul_msg_ul">
						<li class="zhuanfa"><span><img src="../../assets/img/zhuanfa.png"><em class="little_number">{{value.mcopy}}</em></span></li>
						<li class="pinglun" @click="shows(index,value.mid)"><span><img src="../../assets/img/pinglun.png"><em class="little_number">{{value.mreply}}</em></span></li>
						<li class="line" @click="Like(value.mlike,index,value.mid,data.user.uid,value.uid)"><span><img src="../../assets/img/line.png"><em
								 v-bind:class="value.mlike==1?'li_like':'littel_numer'">{{value.mfav}}</em></span></li>
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
						<div class="comment-show-con-img pull-left"><img :src="imgBaseUrl+c.uimage" width="50px" heigth="50px"></div>
						<div class="comment-show-con-list pull-left clearfix">
							<div class="pl-text clearfix">
								<a href="#" class="comment-size-name">{{c.uname}} : </a>
								<span class="my-pl-con">&nbsp;{{c.rcontent}}</span>
							</div>
							<div class="date-dz">
								<span class="date-dz-left pull-left comment-time">{{c.rdatetime}}</span>
								<div class="date-dz-right pull-right comment-pl-block">
									<a href="javascript:;" class="removeBlock">删除</a>
									<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" @click="show_son(j,c.uname)">回复</a>
									<span class="pull-left date-dz-line">|</span>
									<a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>
								</div>
								<div class="hf-con pull-left" v-bind:class="Alldata.s_son==j?'display_show':'display_none'">
									<textarea class="content_son" placeholder="" v-model="Alldata.s_son_reply"></textarea> <a href="javascript:;" class="hf-pl"
									 @click="reply(value.mid,c.uid,data.user.uid,c.rid,j)">评论</a></div>
							</div>

							<div class="all-pl-con" v-for="(d,q) in c.list">
								<div class="pl-text hfpl-text clearfix">
									<a href="#" class="comment-size-name">{{d.uname}} : </a>
									<span class="my-pl-con">{{d.content}}</span></div>
								<div class="date-dz"> <span class="date-dz-left pull-left comment-time">{{d.reply_time}}</span>
									<div class="date-dz-right pull-right comment-pl-block">
										<a href="javascript:;" class="removeBlock">删除</a>
										<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" @click="show2(j,q,d.uname)">回复</a>
										<span class="pull-left date-dz-line">|</span>
										<a href="javascript:;" class="date-dz-z pull-left">
											<i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> </div>
								</div>

								<div class="hf-con pull-left" v-bind:class="(Alldata.s_son_2==q && Alldata.s_son3==j)?'display_show':'display_none'">
									<textarea class="content_son" placeholder="" v-model="Alldata.s_son_reply_2"></textarea>
									<a href="javascript:;" class="hf-pl" @click="reply2(value.mid,d.from_userid,data.user.uid,d.rid,j)">评论</a></div>
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
/* 	var Alldata = {

		list: [
			'{1},{2}', '{3},{4}'
		],
		content: [],
		flag: -1,
		ct: ['{1}', '{2}']
	} */
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
            s_son:-1,
            s_son_reply:'回复:@',
            s_son_2:-1,
            s_son_reply_2:'回复:@',
            s_son3:-1                       //记录二维列表
        }
	export default {
		name: "msgList",
		data() {
			return {
				Alldata,
				imgBaseUrl
			}
		},
		methods: {
		 reply2:function(a,b,c,d,j){
                    var myDate = new Date();
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var now=month+"-"+date+" "+h+':'+m;
                    this.$http.post('/Msg/insert_reply',
                        {mid:a,reply_id:b,from_id:c,content:this.Alldata.s_son_reply_2,rid:d}, {emulateJSON: true}).then(function (res) {
                        console.log(res)
                        this.contents[j].list.unshift(
                            {
                                content:this.Alldata.s_son_reply_2,
                                from_userid:c,
                                rdatetime:now,
                                reply_id:b,
                                rid:d,
                                uname:data.user.uname
                            }
                        )

                        this.Alldata.s_son_reply_2='回复:@'
                        this.Alldata.s_son_2=-1
                        this.Alldata.s_son3=-1
                    }, function (res) {
                        console.log(res);
                    })
                }
                ,
                show2:function(j,q,name){

                    this.Alldata.s_son_reply_2+=name+":"
                    if(this.Alldata.s_son_2==q){
                        this.Alldata.s_son_reply_2='回复:@'
                        this.Alldata.s_son3=-1
                        this.Alldata.s_son_2=-1                              //隐藏
                    }else{
                        this.Alldata.s_son3=j
                        this.Alldata.s_son_2=q
                    }
                }
                ,
                reply:function(mid,reply_id,from_id,rid,j){
                    var myDate = new Date();
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var now=month+"-"+date+" "+h+':'+m;
                    this.$http.post('/Msg/insert_reply',
                        {mid:mid,reply_id:reply_id,from_id:from_id,content:this.Alldata.s_son_reply,rid:rid}, {emulateJSON: true}).then(function (res) {
                        console.log(res)
                    this.contents[j].list.unshift(
                        {
                                content:this.Alldata.s_son_reply,
                                from_userid:from_id,
                                rdatetime:now,
                                reply_id:reply_id,
                               rid:rid,
                            uname:data.user.uname
                        }
                    )

                        this.Alldata.s_son_reply='回复:@'
                        this.Alldata.s_son=-1
                    }, function (res) {
                        console.log(res);
                    })
                },
                show_son:function(j,name){
                    this.Alldata.s_son_reply+=name
                    if(this.Alldata.s_son==j){
                        this.Alldata.s_son_reply='回复:@'+":"
                        this.Alldata.s_son=-1
                    }else{
                         this.Alldata.s_son=j
                    }
                },
                shows:function(index,mid){
                    this.$http.post('/Msg/query_contentbyMid', {mid:mid},{emulateJSON: true}).then(function (res) {
                       console.log(res)
                        this.Alldata.contents = res.data
                    }, function (res) {
                        console.log(res);
                    })
                    if(this.Alldata.flag==index){
                        this.Alldata.flag=-1
                    }else{
                        this.Alldata.flag=index
                    }
                    },
                query_msg_all: function () {
                    this.$http.post('/Msg/query_msg_all', {emulateJSON: true}).then(function (res) {
                        console.log(res.data);
                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].mcontent = this.subs(res.data[i].mcontent)
                        }
                        Alldata.msg = res.data
                    }, function (res) {
                        console.log(res);
                    })
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
                Like: function (mlike, index, mid, uid, suid) {

                    this.$http.post('/Msg/update_addLike', {
                        mlike: mlike,
                        index: index,
                        mid: mid,
                        uid: uid,
                        suid: suid
                    }, {emulateJSON: true}).then(function (res) {
                        console.log(res.data);
                        if (res.data == 1) {
                            this.Alldata.msg[index].mlike = 1
                            this.Alldatamsg[index].mfav += 1
                        }
                        else if (res.data == 0) {
                            this.Alldata.msg[index].mlike = 0
                            this.Alldata.msg[index].mfav -= 1
                        }
                    }, function (res) {
                        console.log(res);
                    })


                }
            },
            mounted: function () {

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
