import Vue from 'vue'
import Router from 'vue-router'
import im from '../pages/im/im.vue'
import main from '../pages/main/main.vue'
Vue.use(Router)

export default new Router({
	  base: '/dist/', 
		routes : [
		{
			path:'/im',
			component:im
		},
			{
			path:'/',
			component:main
		}
	
	]
 
})
