<template>
			<div class="row" id="edit_form">
                    <span class="pull-left" style="margin:15px;">编写新鲜事</span>
                    <span class="tips pull-right" style="margin:15px;"></span>
                    <div id="app">

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <textarea spellcheck="false" contentEditable="true" id="content"
                                              class="form-control "></textarea>
                                </div>
                                <div class="col-sm-12" style="margin-top: 12px;">

                                    <span class="emoji">表情</span>

                                    <span class="pic" @click="fileClick">图片</span>
                                    <span>

  <div class="hello" v-bind:class="Alldata.imgList.length>0?'display_block':'display_none'">
    <div class="upload">
      <div class="upload_warp_text">
        选中{{Alldata.imgList.length}}张文件，共{{bytesToSize(Alldata.size)}}
      </div>
      <input @change="fileChange($event)" type="file" id="upload_file" name="file" style="display: none" multiple/>
      <div class="upload_warp_img" v-show="Alldata.imgList.length!=0">
        <div class="upload_warp_img_div" v-for="(item,index) of Alldata.imgList">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">
              {{item.file.name}}
            </div>
            <img src="../../assets/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
          </div>
          <img :src="item.file.src">
        </div>
        <div class="upload_warp">
        <div class="upload_warp_left" @click="fileClick">
          <img src="../../assets/img/upload.png">
        </div>
      </div>
      </div>

    </div>
                 </div>

                                </span>
                                </div>

                                <div class="myEmoji">
                                    <ul id="myTab" class="nav nav-tabs">
                                        <li class="active">
                                            <a href="#set" data-toggle="tab">
                                                预设
                                            </a>
                                        </li>
                                        <li><a href="#hot" data-toggle="tab">热门</a></li>

                                    </ul>
                                    <div id="myTabContent" class="tab-content">
                                        <div class="tab-pane fade in active" id="set">
                                            <div class="emoji_1"></div>

                                        </div>
                                        <div class="tab-pane fade" id="hot">
                                            <div class="emoji_2"></div>
                                        </div>

                                    </div>
                                </div>
                                <!-- <span> <input type="file" id="selectImg" value="" ></input> </span> -->
                                <button @click="upload" id="send" class="btn btn-default pull-right disabled" >发布</button>
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
      var Alldata = {
            imgList: [],						//选中图片
            size: 0,								//图片张数
            content_send: "",							//发布内容时传到后台的值（包含文字表情）
            length: 0,								//截取字符串和表情
            file: '',
			imgBaseUrl
	
}
	
$(function() {

    $("#content").keyup(function() {
        var id=$("#content").val()
        //判断输入的字符串长度
        var content_len = $("#content").val().replace(/\s/g, "").length;
        $(".tips").text("已经输入" + content_len + "个字");

        if(content_len == 0) {
            // alert(content);
            $(".tips").val("");
            $("#send").addClass("disabled");
            return false;
        } else {
            $("#send").removeClass("disabled");
        }
    });

    /**
     * subs() 返回文字+表情，例如asd[img/h5.png]b[img/h6.png]
     * 返回asd<img src="img/h5.png">b<img src="img/h6.png">
     * var con="asd[img/h5.png]b[img/h6.png]"
     */
    function subs(con){
        var lin=''
        for(var i=0;i<con.length;i++){
            if(con.substr(i,1)=='['){
                var s=''
                i++
                while(!(con.substr(i,1)==']')){
                    s+=con.substr(i,1)
                    i++
                }lin+="<img src='" + s + "' style='width:25px;height:25px' >"
            }else{
                lin+=con.substr(i,1)
            }
        }
        return lin;
    }

    //点击按钮发送内容
    $("#send").click(function() {
        $(".myEmoji").hide();
        var content = $("#content").val();				//输入框
        var content_show=subs(content)
        $("#content").val('')
        $(".tips").text('');
        Alldata.imgList=[]
    });

    //添加表情包1
    for(var i = 1; i < 60; i++) {

        $(".emoji_1").append("<img src='"+imgBaseUrl+"/static/img/f" + i + ".png' style='width:35px;height:35px' >");
    }
    //添加表情包2
    for(var i = 1; i < 61; i++) {

        $(".emoji_2").append("<img src='"+imgBaseUrl+"/static/img/h" + i + ".png' style='width:35px;height:35px' >");
    }

    $(".emoji").click(function() {

        $(".myEmoji").show();

        //点击空白处隐藏弹出层
        $(document).click(function(e) {

            if(!$("#edit_form").is(e.target) && $("#edit_form").has(e.target).length === 0) {

                $(".myEmoji").hide();
            }
        });

    });

    //将表情添加到输入框
    $(".myEmoji img").each(function() {
        $(this).click(function() {
            var url = $(this).attr("src");
            var ele=document.getElementById('content')
            ele.value+='['+url+']'
            $("#send").removeClass("disabled");
        })
    })



    //放大或缩小预览图片
    $(".mypic").click(function() {
        var oWidth = $(this).width(); //取得图片的实际宽度
        var oHeight = $(this).height(); //取得图片的实际高度

        if($(this).height() != 200) {
            $(this).height(200);
        } else {
            $(this).height(oHeight + 200 / oWidth * oHeight);

        }

    })

})
	export default{
		 data(){
				return {
		Alldata
			}},
				computed: {
				...mapGetters(['user'])
			},
    methods: {
        fileClick: function() {
            document.getElementById('upload_file').click()
        },

        fileChange: function(el) {
            Alldata.file=el.target.files[0]
            if(!el.target.files[0].size) return;
            this.fileList(el.target);
            el.target.value = ''
        },
        upload:function(){
                 var t_files = Alldata.imgList;
                 var myform = new FormData();
                  for (var i=0;i<t_files.length;i++){
                       console.log(t_files[i].file)
                       myform.append('file',t_files[i].file);
                   }
                console.log(myform)
            this.upl(myform)
        },upl:function(myform){
			var mid=null
            $.ajax({
                url : '/upload/uploadvcf', //用于文件上传的服务器端请求地址
                type : 'post',
                data:myform,
                dataType : 'json',
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                cache: false,
                async:false,
                success : function(data) {
                    // alert(result.result);
                    console.log(data)
                    mid=data.mid
                },
                error : function(data) {
                    console.log(data)
                }})
                    this.send_msg(mid)
        },
    send_msg:function (mid) {
        var content = document.getElementById("content").value
        this.$http.post('/Msg/insert_msg',{mid:mid,content:content,uid:this.user.uid},{emulateJSON:true}).then(function(res){
            console.log(res.data);
        },function (res) {
            console.log(res);
        })
    },
        fileList: function(fileList) {
            let files = fileList.files;

            for(let i = 0; i < files.length; i++) {

                //判断是否为文件夹
                if(files[i].type != '') {
                    this.fileAdd(files[i]);
                } else {
                    //文件夹处理
                    this.folders(fileList.items[i]);
                }
            }
        },
        //文件夹处理
        folders: function(files) {
            let _this = this;
            //判断是否为原生file
            if(files.kind) {
                files = files.webkitGetAsEntry();
            }
            files.createReader().readEntries(function(file) {
                for(let i = 0; i < file.length; i++) {
                    if(file[i].isFile) {
                        _this.foldersAdd(file[i]);
                    } else {
                        _this.folders(file[i]);
                    }
                }
            })
        },
        foldersAdd: function(entry) {
            let _this = this;
            entry.file(function(file) {
                _this.fileAdd(file)
            })
        },
        fileAdd: function(file) {
            //总大小
            this.size = this.size + file.size;
            //判断是否为图片文件
            if(file.type.indexOf('image') == -1) {
                file.src = 'wenjian.png';
                this.imgList.push({
                    file
                });
                this.file=file
            } else {
                let reader = new FileReader();
                reader.vue = this;
                reader.readAsDataURL(file);
                reader.onload = function() {
                    file.src = this.result;
                    Alldata.imgList.push({
                        file
                    });
                }
            }
        },
        fileDel: function(index) {
            this.size = this.size - this.imgList[index].file.size; //总大小
            this.imgList.splice(index, 1);
        },
        bytesToSize: function(bytes) {
            if(bytes === 0) return '0 B';
            let k = 1000, // or 1024
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return(bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        drop: function(el) {
            el.stopPropagation();
            el.preventDefault();
            this.fileList(el.dataTransfer);
        }
    }

	}
</script>
<style scoped>
	@import url("bootstrap/dist/css/bootstrap.min.css");
/* 	@import url("../../../static/css/style.css"); */
#edit_form{
	background: #fff;
	padding-bottom: 8px;
	border-radius: 3px;
    border: 1px solid #eee;
}

 #content{
 	height:95px;
 	border-style:solid;
 	border-width:1px;
 	border-color:#AEEEEE}

.emoji{
	background: url(../../assets/img/face.png)  no-repeat;
	padding:1px 0 10px 25px;
	cursor: pointer;
	font-size: 13px;
	
	
}
.pic{
	background: url(../../assets/img/pic.png)  no-repeat;
	margin-left: 10px;
	padding:1px 0 10px 25px;
	cursor: pointer;
	font-size: 13px;
	
}
.myEmoji{
	background: #fff;
	padding: 15px;
	border-radius: 3px;
    border: 1px solid #eee;
    box-shadow: 0 4px 20px 1px rgba(0,0,0,0.2);
    position:absolute;
    top:40px;
    z-index: 9999;
    display: none
}
.myEmoji img{
	 border: 1px solid #ccc;
	 padding: 4px;
}
#send{
	 margin-top:-5px ;
	 background: #e0620d;
	 color: #fff;
	 padding: 8px 30px
}



















@media only screen and (-webkit-min-device-pixel-ratio:1.25), (min-resolution:120dpi) {
    html {
        background-size: 51px auto;
    }
}





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


.little_number{
	color: darkgrey;
}





.display_block{
	display: block;
}
.display_none{
	display: none;
} 
</style>
