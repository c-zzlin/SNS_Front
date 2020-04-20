import Vue from 'vue'
import Router from 'vue-router'
import im from '../pages/im/im.vue'
import main from '../pages/main/main.vue'
import person from '../pages/person/person.vue'
import login from '../pages/login/login.vue'
import register from '../pages/login/register.vue'
import  person_redirect from '../pages/person/person_redirect.vue'
import main_redirect from '../pages/main/main_redirect'
Vue.use(Router)

const router =new Router({
	  base: '/dist/',
		routes : [
		{
			path:'/im',
			component:im
		},
			{
			path:'/',
			component:main
		},
		{
			path:"/person",
			component:person
		},
    {
      path:"/person_redirect",
      component:person_redirect
    },
		{
			path:"/login",
			component:login
		},
		{
			path:"/register",
			component:register
		},
      {
        path:"/main_redirect",
        component:main_redirect
      }

	]

})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token == '') {
      next('/login');
    } else {
      next();
    }
  }
});
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default router
