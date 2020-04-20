//提交Mutation是更改vuex状态得唯一合法方法
export const query_nav_msg =(state, nav_msg)=>{
		state.nav_msg=nav_msg;		//把传递过来的参数 赋值给state
}
/* export const query_user =(state, user)=>{
		state.user=user;		//把传递过来的参数 赋值给state
} */
export const get_user =(state,user)=>{
		state.user=user;
     state.token = user.token;
     localStorage.setItem('token', user.token);
}
export const clear_user =(state,user)=>{
  state.user=null;
  state.token=null;
  window.localStorage.clear();
}
