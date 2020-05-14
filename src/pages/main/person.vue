<template>
	 <div class="col-sm-3 col-xs-12 part_right">
                <div id="myself">
                <div class="row text-center inform">
                    <img v-bind:src="user.user_image">
                    <h4 style="font-weight: bold;">{{user.user_aiais}}</h4>
                    <div class="col-sm-12 my_inform">
                      <div class="col-sm-4 col-xs-4">
                            <div><span v-if="nav_msg.like>0">{{nav_msg.like}}</span>
                                <span v-else>0</span></div>
                            <div class="sort">点赞</div>

                        </div>
                        <div class="col-sm-4 col-xs-4">
                            <div><span v-if="nav_msg.friend>0">{{nav_msg.friend}}</span>
                                <span v-else>0</span></div>
                            <div class="sort">好友</div>
                        </div>
                        <div class="col-sm-4 col-xs-4">
                            <div><span v-if="nav_msg.msg>0">{{nav_msg.msg}}</span>
                                <span v-else>0</span></div>
                            <div class="sort">动态</div>
                        </div>
                    </div>
                </div>
                </div>
		<div class="row part_hot">
			<div class="col-sm-12">
				<span class="pull-left" style="padding: 10px;font-size:16px;font-weight: bold;">推荐好友</span>
				<span class="pull-right" style="padding: 10px;">可能认识的人</span>
			</div>
			<hr style="margin: 0;padding: 0;width: 100%">

			<div class="col-sm-12 item_hot">
				<span class="pull-left">#AAAAAA#</span>
				<span class="pull-right item_num">bbb的好友</span>
			</div>

			<div class="col-sm-12 item_hot">
				<span class="pull-left">#BBBBB#</span>
				<span class="pull-right item_num">ccc的好友</span>
			</div>

			<div class="col-sm-12 item_hot">
				<span class="pull-left">#CCCCC#</span>
				<span class="pull-right item_num">aa,bb等多人的好友</span>
			</div>

			<div class="col-sm-12 item_hot">
				<span class="pull-left">#DDDDD#</span>
				<span class="pull-right item_num">共有3个共同好友</span>
			</div>

			<div class="col-sm-12 item_hot">
				<span class="pull-left">#EEEEE#</span>
				<span class="pull-right item_num">ddd的好友</span>
			</div>

			<hr style="margin: 0;padding: 0;width: 100%">

			<div class="col-sm-12 text-center" style="padding: 10px"><a href="#">查看更多</a></div>

		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
import {mapActions, mapGetters} from 'vuex'
	import {imgBaseUrl} from '../../config/env.js'
export default{
	name:"myself",
	data(){
		return {
			imgBaseUrl
		}
	},
	 computed: {
      ...mapGetters(['nav_msg','user']) // 动态计算属性，相当于this.$store.getters.resturantName
  }

}
</script>

<style scoped>
	@import url("bootstrap/dist/css/bootstrap.min.css");

	.sort {
		color: #777;
	}
	.part_right {
		margin-top: 80px;
		padding-left: 20px;
    position: fixed;
    left: 71%;
	}

	.inform {
		background: #fff;

		border-radius: 3px;

		border: 1px solid #eee;
	}

	.inform img {
		border-radius: 50%;
		width: 80px;
		height: 80px;
		margin-top: 20px;
	}

	.my_inform {
		padding: 10px;
	}

	.item_hot {
		padding: 10px 20px
	}

	.item_num {
		color: #999
	}

	.part_hot {
		background: #fff;
		margin-top: 5px;
		border: 1px solid #eee;
	}

	@media screen and (max-width: 699px) and (min-width: 320px) {

		.item_hot {
			font-size: 12px;
		}

		.part_right {
			margin-top: 10px;
			padding-left: 0px;

		}


		.item_hot {
			padding: 15px 25px
		}

		.inform {
			padding-bottom: 15px;
		}

	}
</style>
