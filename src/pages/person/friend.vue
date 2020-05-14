<template>


  <div id="list">

    <div id="middle_list">
  	<ul id="fre_list">
  		<li v-for="(value,index) in Alldata.friend">
  			<div class="li_img">
          <div class="img_box">
  				<img v-bind:src="value.user_image" width="86" height="86"/>
</div>
  			</div>
        <div class="div_right">

  			<div class="li_name">
  						<span class="li_username">{{value.user_aiais}}</span>
  			</div>
  			<div class="content_msg">
  				<p class="somecontent">{{value.user_info}}</p>

  			</div>
      <div class="content_msg">
  				<p class="somecontent" v-if="value.user_sex==1">性别：男</p>
          <p class="somecontent" v-if="value.user_sex==2">性别：女</p>
  			</div>
<!--    根据后台查询返回信息，判断显示什么，a.添加好友  b.删除好友   c.通过好友申请-->
        <div class="button_box">
          <span class="btn_tips">{{Alldata.is_friend}}</span>
          <div class="btn_float_box">
          <button class="btn" @click='select_func(value.user_id)'>{{Alldata.button}}</button>
            </div>

        </div>


        </div>
  		</li>
  	</ul>
    </div>



  </div>


</template>

<script>
  import Vue from 'vue'
  import {
  		imgBaseUrl
  	} from '../../config/env.js'
   import{
     search_friend,
     friend_list,
     friend_commit,
     friend_add,
     friend_delete,
     friend_confirm
   }from '../../request/api.js'
   import {mapGetters} from 'vuex'
  const Alldata = {
     friend:[],
     button:"",
     is_friend:""
   }
   export default {
     name:'Friend',

   data () {
     return {
       Alldata,
       imgBaseUrl
     }
   },
 computed: {
       ...mapGetters(['user']) // 用户属性，动态计算属性，相当于this.$store.getters.resturantName
   },
   methods:{
     redirect_person(){         //跳转回好友列表，即头部导航个人头像tab入口
       this.$router.push(
         {
           path:"/person_redirect",
           query:{
             to:2
           }
         }
       );
     }
     ,
     select_func(friend_id){
       let data={
         user_id:this.user.user_id,
         friend_id:friend_id
       }
       if(this.Alldata.button == "添加好友"){
            friend_add(data).then(
             res=>{
               if(res.code==200){
                 this.redirect_person();
               }
             }
            ).catch( err => console.log(err));
       }else if(this.Alldata.button == "删除好友"){
            friend_delete(data).then(
             res=>{
               if(res.code==200){
                 this.redirect_person();
               }
             }
            ).catch( err => console.log(err));
       }else if(this.Alldata.button == "通过申请"){
            friend_confirm(data).then(
             res=>{
               if(res.code==200){
                 this.redirect_person();
               }
             }
            ).catch( err => console.log(err));
       }
     },
     init(){
       let to=this.$route.query.to;
       //1.从搜索框跳转  2.从头部导航头像tab跳转 3.查看好友申请
       if(to == 1){
         let search_input = this.$route.query.search_input;
         let data={
           user_aiais:search_input,
           user_id: this.user.user_id
         }
         //根据名字模糊查询，返回结果渲染
         search_friend(data).then(
          res=>{
            this.Alldata.friend=res.data;
          }
         ).catch( err => console.log(err));
         this.Alldata.button="添加好友"
         this.Alldata.is_friend="未添加"
       }else if(to == 2){
          let userid=this.user.user_id;
          let data={
            user_id:userid
          }
          friend_list(data).then(
            res=>{
              this.Alldata.friend=res.data;
            }
          ).catch( err => console.log(err));
          this.Alldata.button="删除好友"
          this.Alldata.is_friend="已添加"
       }else if(to == 3){
          let userid=this.user.user_id;
          let data={
            user_id:userid
          }
         friend_commit(data).then(
         res=>{
           this.Alldata.friend=res.data;
         }).catch( err => console.log(err));
         this.Alldata.button="通过申请"
         this.Alldata.is_friend="申请添加为好友"
       }

     }
   },
   mounted(){
     this.init();
   }
   }
</script>

<style scoped>

  #list {
  	overflow: hidden;
  	height: 603px;
    background-color: lightgrey;
  }
  #middle_list{
    margin-top: 8%;
    margin-left: 25%;
    width: 50%;
    height: 100%;
  }
  #fre_list{
    height: 100%;
    position: relative;
  }
  .li_img {
  	display: inline;
  	float: left;
    width: 20%;
    height: 100%;
    position: relative;
  }
  .img_box{
    padding-top: 10%;
    padding-left: 10%;
  }
  .li_img img{
        border-radius: 50%;
  }

  .div_right{
    width: 80%;
    height: 100%;
    float: right;
  }


  .clearfix {
  	display: block;
  }

  .li_name {
  	width: 30%;
  	height: 25%;
  	display: inline-block;
    font-size: 1.25rem;
  }

  .li_username {
  	color: black;
  }

  #fre_list li {
  	width: 100%;
  	height: 20%;
  	border-bottom: 1px white solid;
    position: relative;
  }

li{
  list-style: none;
  size: 40px;
}


  .w_f1 {
  	float: left;
  }

  .w_f2 {
  	color: white;
  	float: right;
  }

  .somecontent {
  	color: grey;
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

  .button_box{
    float: right;
    width: 100%;
    height: 30%;
  }
  .btn_float_box{
    float: right;
  }
  .btn{
    width: 100px;
    height: 30px;
    border-radius: 15%;
  }
  .btn_tips{
    color: red;
  }
</style>
