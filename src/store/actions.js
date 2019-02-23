
// ES6精简写法
// export const modifyAName = ({commit},name) => commit('modifyAName', name)

// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
/* export function modifyAName({commit}, name) { // commit 提交；name即为点击后传递过来的参数，此时是 'A餐馆'
    return commit ('modifyAName', name)
} */


/* export const query_nav_msg=({commit},uid)=> commit('query_nav_msg',uid) */

export const query_nav_msg=({commit},nav_msg)=> commit('query_nav_msg',nav_msg)
export const query_user=({commit},user)=> commit('query_user',user)