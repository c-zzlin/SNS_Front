<template>
	<div>
		<div class="Registercontent_inner">
			<div class="inner_log">
				<ul class="inner_uletf">
					<li class="inner_uletf_log">
						<i class="layui-icon layui-icon-login-weibo" style="color:#1da1f2 ; font-size: 2.5em;" ></i>
					</li>
					<li class="inner_uletf_sousuo"><i id="icon_suosou" class="iconfont icon-sousuo"></i></li>
					<li ><input type="text" class="Registersousuo" placeholder="搜索  Weibo" /></li>
				</ul>
				<ul class="inner_urigth">
					<li class="inner_urigthRegister">注册</li>
					<li class="inner_urigthLogin">登录</li>
					<!--<li><i class="iconfont icon-fenlei"></li>-->
				</ul>
			</div>
		</div>
		<div class="Registercontent_outer">
			<div class="outer_r">
				<div class="outer_rTop">
					<div class="outer_rTopleft"></div>
					<i class="layui-icon layui-icon-login-weibo" style="color:#1da1f2 ; font-size: 2.5em;margin-top: 2%;" ></i>
					<div class="outer_rToprigth">
						<div class="outer_rToprigth_next" id="next">下一个</div>
					</div>
				</div>
				<div class="outer_rCont">
					<h2>创建你的账号</h2>
					<input type="text" placeholder="名字" class="outer_rContInp" style="padding-top: 3%;" name="Uaiais" id="Uaiais"/>
					<h5 style="margin-left: 90%;">0/10</h5>
					<input type="text" placeholder="手机" class="outer_rContInp" name="Utel" id="Utel" />
					<input class="yanzhengma" type="text" placeholder="验证码" id="Y_Code"/>
					<input id="btnCode" type="button" value="点击获取验证码" style="cursor: pointer;"/>
				</div>

			</div>
			<div class="outer_rnext">

				<div class="outer_rTop">
					<div class="outer_rTopleft"></div>
					<i class="layui-icon layui-icon-login-weibo" style="color:#1da1f2 ; font-size: 2.5em;margin-top: 2%;" ></i>
					<div class="outer_rToprigth">
						<div class="outer_rToprigth_next" id="suc">完成</div>
					</div>
				</div>
				<div class="outer_rCont">
					<h2>完善你的信息</h2>
					<input type="text" placeholder="账号" class="outer_rContInp" style="padding-top: 3%;" name="Uid" id="Uid"/>
					<h5 style="margin-left: 90%;">0/10</h5>
					<input type="password" placeholder="密码" class="outer_rContInp" name="Upasswd" id="Upasswd"/>
					<input type="password" placeholder="确认密码" class="outer_rContInp" id="QenrenUpasswd"/>
					<input type="text" placeholder="邮箱" class="outer_rContInp" name="Ulogon" id="Ulogon"/>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	export default{}
	$(function() {
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


	    $("#next").click(function () {
	        var Y_Code = $("#Y_Code").val();
	        $.ajax({
	            contentType: 'application/json',
	            url:"user/registerCode.do",
	            type:'POST',
	            dataType:'json',//json 返回值类型
	            data: JSON.stringify({"y_code":Y_Code}),//转化为json字符串
	            success:function(data){
	                if (data.result == "null"){
	                    alert("验证码不能为空")
	                }else if (data.result == "no"){
	                    alert("验证码错误！")
					}else if(data.result == "yes"){
	                    $(".outer_rnext").show();
	                    $(".outer_r").hide();
					}
	            }
	        });

	    })

			$("#suc").click(function () {
	            var uaiais = $("#Uaiais").val();
	            var utel = $("#Utel").val();
	            var ulogon = $("#Ulogon").val();
	            var uid = $("#Uid").val();
	            var upasswd = $("#Upasswd").val();
	            var qenrenUpasswd = $("#QenrenUpasswd").val();

	            var user = {
	                "uaiais":uaiais,
	                "uid":uid,
	                "ulogon":ulogon,
	                "utel":utel,
	                "upasswd":upasswd
	            }
	            if (qenrenUpasswd != upasswd){alert("请确保密码一致")
	            } else {
	            		$.ajax({
	                	contentType: 'application/json',
						url:"user/register.do",
	                	type:'POST',
	                	dataType:'json',//json 返回值类型
	                	data: JSON.stringify(user),//转化为json字符串
	                	success:function(data){
	                        window.location.href = "login.html";
						}
	            	});
	            }
	        })

			$("#Uaiais").focusout(function () {
	              var uaiais = $("#Uaiais").val();
	              if (uaiais != null && uaiais  != ""){
	                  $.ajax({
	                      contentType: 'application/json',
	                      url:"user/registerCheck.do",
	                      type:'POST',
	                      dataType:'json',//json 返回值类型
	                      data: JSON.stringify({"uaiais":uaiais}),//转化为json字符串
	                      success:function(data){
	                          if (data.result == "yes"){
	                              alert("该昵称已被使用")
	                              $("#Uaiais").val("");
	                          }
	                      }
	                  });
				  }
	          })

	        $("#Utel").focusout(function () {
	            var utel = $("#Utel").val();
	            var message = "";
	//            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	//            if(utel == ''){
	//                message = "手机号码不能为空！";
	//                alert(message);
	//                return;
	//            }else if(utel.length !=11){
	//                message = "请输入有效的手机号码！";
	//                alert(message);
	//                return;
	//            }else if(!myreg.test(utel)){
	//                message = "请输入正确的手机号码！";
	//                alert(message);
	//                return;
	//            }else {
	            if (utel != null && utel  != "") {
	                $.ajax({
	                    contentType: 'application/json',
	                    url: "user/registerCheck.do",
	                    type: 'POST',
	                    dataType: 'json',//json 返回值类型
	                    data: JSON.stringify({"utel": utel}),//转化为json字符串
	                    success: function (data) {
	                        if (data.result == "yes") {
	                            $("#Utel").val("");
	                            alert("该手机号已被使用")
	                        }
	                    }
	                });
	            }
	        })

	        $("#Ulogon").focusout(function () {
	            var ulogon = $("#Ulogon").val();
	            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	            if(!reg.test(ulogon)){
	                alert("邮箱格式不对");
	                return false;
				}
	            else if (ulogon != null && ulogon  != "") {
	                $.ajax({
	                    contentType: 'application/json',
	                    url: "user/registerCheck.do",
	                    type: 'POST',
	                    dataType: 'json',//json 返回值类型
	                    data: JSON.stringify({"ulogon": ulogon}),//转化为json字符串
	                    success: function (data) {
	                        if (data.result == "yes") {
	                            $("#Ulogon").val("");
	                            alert("该邮箱已被使用")
	                        }
	                    }
	                });
	            }
	        })

	        $("#Uid").focusout(function () {
	            var uid = $("#Uid").val();
	            if (uid != null && uid  != "") {
	                $.ajax({
	                    contentType: 'application/json',
	                    url: "user/registerCheck.do",
	                    type: 'POST',
	                    dataType: 'json',//json 返回值类型
	                    data: JSON.stringify({"uid": uid}),//转化为json字符串
	                    success: function (data) {
	                        if (data.result == "yes") {
	                            $("#Uid").val("");
	                            alert("该账号已被使用")
	                        }
	                    }
	                });
	            }
	        })
		})

		var count = 60;
		function GetNumber() {
			$("#btnCode").attr("disabled", "disabled");
			$("#btnCode").val(count + "秒之后点击获取")
			count--;
			if (count > 0) {
				setTimeout(GetNumber, 1000);
			} else {
				$("#btnCode").val("点击获取验证码");
				$("#btnCode").attr("disabled", "");
			}
		}
</script>

<style scoped>
	@import url(../../../static/layer/css/layui.css);
	@import url(../../../static/css/register.css);
</style>
