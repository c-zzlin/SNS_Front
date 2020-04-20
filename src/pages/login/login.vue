<template>
			<div class="content">
				<div class="content_left"></div>
				<div class="content_right">
					<div class="content_right_login">
						<input type="text" class="logininput" placeholder="手机、邮箱或用户名" name="Uid" id="Uid" v-model="Alldata.LoginForm.user_logon"/>&nbsp;&nbsp;
						 <input type="password" class="logininput" placeholder="密码" name="Upasswd" id="Upasswd" v-model="Alldata.LoginForm.user_password"/>&nbsp;&nbsp;&nbsp;
						 <button @click="sign_in" id="but">登录</button><br />
							<h5><a href="#" class="forgetPassword">忘记密码？</a></h5>
					</div>
					<div class="content_right_ioc">
						<i class="layui-icon layui-icon-login-weibo" style="color:#1da1f2 ; font-size: 3.5em;" ></i>
						<h1 class="StaticLoggedOutHomePage-signupTitle">看看亲朋好友的生活</h1>
						<h2 class="StaticLoggedOutHomePage-signupSubtitle">现在就加入  SNS</h2>
						<a class="buttonSignup alikeButton" @click="register_click">注册</a>
						<a href="#" class="buttonLogin alikeButton" id="login">登录</a>
					</div>
				</div>
				<div class="content_foot">
					<ul class="foot_ul">
						<li><a href="#">关于</a></li>
						<li><a href="#">帮助中心</a></li>
						<li><a href="#">博客</a></li>
						<li><a href="#">状态</a></li>
						<li><a href="#">工作机会</a></li>
						<li><a href="#">条款</a></li>
						<li><a href="#">隐私政策</a></li>
						<li><a href="#">Cookies</a></li>
						<li><a href="#">广告信息</a></li>
						<li><a href="#">商标</a></li>
						<li><a href="#">应用</a></li>
						<li><a href="#">广告</a></li>
						<li><a href="#">市场营销</a></li>
						<li><a href="#">企业</a></li>
						<li><a href="#">开发者</a></li>
						<li><a href="#">目录</a></li>
						<li><a href="#">设置</a></li>
						<li>© 2018 Weibo</li>
					</ul>
				</div>
			</div>
</template>

<script>
	import Vue from 'vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {login} from '../../request/api.js'

	const Alldata={
				data:'',
       LoginForm:{
         user_logon:'',
         user_password:''
       }
	};
	 export default{
		 name:'login',
		 data(){
			 return { Alldata }
		 },
		 methods:{
       ...mapActions(
       ['get_user']
       ),
			 register_click:function(){
				 this.$router.replace('/register')
			 },
       sign_in(){
           login(Alldata.LoginForm).then(
            res => {
              if(res.message == 'error'){
                alert("登录失败,用户不存在")
              }
              else if(res.message == 'pwd'){
                alert("登录失败,密码错误")
              }else{
              this.get_user(res.data);
              this.$router.replace("/")
              }

            }).catch(err => console.log(err));

       }
		 }
	 }





/*
	$(function () {
	    $('#but').click(function () {
	        var Uid = $('#Uid').val();
	        var Upasswd = $('#Upasswd').val();

	        var login = {
	            "uid":Uid,
	            "upasswd":Upasswd
	        }
	        $.ajax({
	            url:"user/login.do",
	            contentType:"application/json;charset=UTF-8",
	            type:'POST',
	            dataType:'json',//json 返回值类型
	            data: JSON.stringify(login),//转化为json字符串
	            success:function(data){
	                if(data.result == "success"){
	                    window.location.href = "main.html";
	                }
	                else if(data.result == "IncorrectCredentials"){
	                    alert("密码错误")
	                }
	                else if(data.result == "UnknownAccount"){
	                    alert("账号不存在")
	                }

					},error:function (error) {
	            }
	        });
	    })

	    $("#btnCode").click(function() {
	        //执行获取验证码的操作
	        GetNumber();
	        var utel = $("#Utel").val();
	        $.ajax({
	            contentType: 'application/json',
	            url:"user/phone_code.do",
	            type:'POST',
	            dataType:'json',//json 返回值类型
	            data: JSON.stringify({"utel":utel}),//转化为json字符串
	            success:function(data){}
	        });
	    });

	    $("#login").click(function () {
			$(".login_jiemian").show();
	    })

		$("#outer_rCont_but").click(function () {
			var utel = $("#Utel").val();
			var Y_Code = $("#Y_Code").val();

	        var login = {
	            "uid":utel,
	            "upasswd":Y_Code
	        }
	        $.ajax({
	            url:"user/loginPhone.do",
	            contentType:"application/json;charset=UTF-8",
	            type:'POST',
	            dataType:'json',//json 返回值类型
	            data: JSON.stringify(login),//转化为json字符串
	            success:function(data){
	                window.location.href = "main.html";
	            }
	        });
	    })
	})

	var count = 60;
	function GetNumber() {
	    $("#btnCode").attr("disabled", "disabled");
	    $("#btnCode").val(count + "秒之后再点击")
	    count--;
	    if (count > 0) {
	        setTimeout(GetNumber, 1000);
	    } else {
	        $("#btnCode").val("点击获取验证码");
	        $("#btnCode").attr("disabled", "");
	    }
	} */

</script>

<style scoped>
	@import url(../../../static/layer/css/layui.css);
	@import url(../../../static/css/login_net.css);
</style>
