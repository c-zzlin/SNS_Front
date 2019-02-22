<template>
		<div class="nav_head">
			<div class="left_head_nav">
				<img src="../../assets/img/insimg.png" height="50px" width="50px" class="img_log" />

			</div>
			<div class="hed_nav_font">
				<span class="font_logo">MicroBlog</span>
			</div>

			<div class="search">
				<input type="text" class="search__input" placeholder="Search" id="search_icon" v-on:click="search_block()"
				 v-on:blur="search_none()" />
				<div class="search_div" v-bind:class="data.search_flag==false?'display_none':'display_block'">
					<ul>
						<li class="search_div_li">
							<div>
								<p class="search_div_p">1</p><span>2222</span>
							</div>
						</li>
						<li class="search_div_li">
							<div>
								<p class="search_div_p">1</p><span>2222</span>
							</div>
						</li>
						<li class="search_div_li">
							<div>
								<p class="search_div_p">1</p><span>2222</span>
							</div>
						</li>
					</ul>


				</div>
			</div>

			<div class="nav_right">
				<div class="nav_home">
					<img src="../../assets/img/home.png" height="40px" width="40px" class="icon" />
					<span class="li_circle">
						<span class="li_num">22</span>
					</span>
				</div>
				<div class="nav_home" @click="tiaozhuan()">
					<img src="../../assets/img/msg.png" height="40px" width="40px" class="icon" />
				</div>
				<div class="nav_home" id="email_icon" v-on:mouseover="block()" v-on:mouseout="none()">
					<img src="../../assets/img/email.png" height="40px" width="40px" class="icon" />
					<div class="menu_ul" id="email" v-bind:class="data.flag==false?'display_none':'display_block'">
						<ul>
							<li>
								<div class="li_email">
									<p class="li_content">评论</p>
									<span class="li_circle">
										<span class="li_email_num">22</span>
									</span>
								</div>
							</li>
							<li>
								<div class="li_email">
									<p class="li_content">点赞</p>
									<span class="li_circle">
										<span class="li_email_num">22</span>
									</span>
								</div>
							</li>
							<li>
								<div class="li_email">
									<p class="li_content">私信</p>
									<span class="li_circle">
										<span class="li_email_num">22</span>
									</span>
								</div>
							</li>
							<li>
								<div class="li_email">
									<p class="li_content">转发</p>
									<span class="li_circle">
										<span class="li_email_num">22</span>
									</span>
								</div>
							</li>

						</ul>
					</div>
				</div>
				<div class="nav_home">
					<img src="../../assets/img/person.png" height="40px" width="40px" class="icon" />
				</div>

			</div>
		</div>
</template>

<script>
		import Vue from 'vue'
		const data={
		search_flag:false,
		flag:false
	}
		export default{
			name:'bigdiv',
		    data(){
				return {
		data
			}},
			methods:{
				/**
				 * 跳转页面
				 */
				tiaozhuan:function(){
					/* window.location.href="im.html"; */
					this.$router.replace("/im")
				},
				block:function(){
			
			this.data.flag=true;
		},
		none:function(){
		
			this.data.flag=false;
		},
		search_block:function(){
			this.data.search_flag=true;
		},
		search_none:function(){
			this.data.search_flag=false;
		}
			}}
</script>

<style scoped>
	
		*{
			margin: 0;
			padding: 0;
		}
		.big_div{
			background: cornflowerblue;
			height: 800px;
			width: 100%;
			position: absolute;
		
		}
		.nav_head{
			z-index: 999;
			position: fixed;
			height: 70px;
			width: 100%;
			background: whitesmoke;
		}
		.left_head_nav{
			float: left;
			margin-left: 10%;
			width: 50px;
			height: 70px;
		}
		.img_log{
			padding-top: 10px;
		}
		.hed_nav_font{
			text-align: center;
			margin-left: 2.5%;
			float: left;		
			width: 200px;
			height: 70px;
		}
		.font_logo{
			 display:block;
    position: relative;
    top: 25%;
   font: italic 2em Georgia, serif;
		}
		.search{
			float: left;
			margin-left: 20px;
		}
		.search__input{
			background-image: url(../../assets/img/t8TeL1S.png);
			background-size: 25px 25px;/*小图标的大小*/

			background-position: 5px 4px;/*小图标在input的位置*/

			background-repeat: no-repeat;/*背景小图标不重复*/
	
			padding: 8px 10px 8px 40px;/*设置input内边距*/

/*设置input样式好看*/

		border:1px solid #ddd;

			margin-top: 20px;
			margin-right: 20px;
			margin-left: 20px;

width: 220px;
		}
		.nav_right{
			float: right;
			margin-right: 5%;
		}
		.nav_home{
			height: 50px;
			width: 70px;
			float: left;
			padding:10px 20px 10px 20px;
		}
		.nav_home img:hover{
			background: lightgrey;
		}
		.li_circle {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		display: inline-block;
		background: #f30303;
		vertical-align: top;
	}
	ul{
		list-style: none;
	}
	.menu_ul{
width:0;
height:0;
border-top:15px solid transparent;
border-right:15px solid white;
	}
	.li_email{
		background: white;
		padding-top: 10px;
		height: 30px;
		width: 150px;
		margin-right: 20px;
	}
	.li_content{
		display: inline;
		margin-right:50px;
		
	}
	#email li div:hover{
		background: lightgrey;
	}
	.search_div{
		background: white;
		margin-left: 20px;
		width: 220px;
	}
	.search_div li{
		width: 220px;
		height: 30px;
	}
	.search_div_p{
		color: indianred;
		padding:5%;
		display: inline
	}
.search_div_p span{
	margin-left: 10px;
	}
	
	.main{
		background: darkgrey;
		width: 100%;
		height: 90%;
	}
	.search_div_li :hover{
		background: antiquewhite;
	}

	
	.foot{
		position:absolute;
		background: whitesmoke;
		width: 100%;
		height: 100px;
	}
	.foot_bottom{
		width: 100%;
		height: 100px;
		background: lightgrey;
	}

		.foot_foot_list{
			margin-left: 40%;
		}
		.foot_foot_list dt{
			font-size: 16px;
			padding: 0 0 15px;
		}

.display_block{
	display: block;
}
.display_none{
	display: none;
}

</style>
