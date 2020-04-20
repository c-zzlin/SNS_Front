import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters.js'
import * as actions from './actions.js'
import * as mutations from './mutations.js'

Vue.use(Vuex)
//声明全局维护的状态state
const state={
	//个人信息，粉丝关注博客数量
	nav_msg:{
		attendCount:0,
		fansCount:0,
		blogCount:0
	},
	user:{
		user_id: "",
	user_aiais: null,
	user_image:"",
	token:""
	},
	 Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
}

//注册上面引入的各大模块
const store=new Vuex.Store({
	state,    // 共同维护的一个状态，state里面可以是很多个全局状态
    getters,  // 获取数据并渲染
    actions,  // 数据的异步操作
    mutations  // 处理数据的唯一途径，state的改变或赋值只能在这里

})
export default store
