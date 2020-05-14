
import { get, post, post2 } from './http'

//接口名 apiAddress   	参数为p         接口地址
export const queryNavMsg = p => post('/api/user/navMsg', p);    //查询好友数量、动态数量
export const login = p =>post('/api/user/login',p);
export const search_friend = p =>post('/api/friend/find', p);         //搜索框查找好友
export const friend_list = p =>post('/api/friend/list', p);         //查看好友哦列表
export const friend_commit = p =>post('/api/friend/commit', p)    //查看好友申请
export const friend_add =p =>post('/api/friend/add', p)           //添加好友
export const friend_delete =p =>post('/api/friend/delete', p)    //好友删除
export const friend_confirm =p =>post('/api/friend/confirm', p)   //好友确认
export const friend_unread =p =>post('/api/friend/unread', p)   //查看好友申请数量
export const blog_search =p =>post('/api/blog/search', p)       //查询全部动态
export const comment_search =p =>post('/api/comment/search', p)   //查询全部评论，根据Msg_id
export const comment_insert =p =>post('/api/comment/insert', p)   //添加评论
export const reply_insert =p =>post('/api/comment/reply', p)       //添加回复
export const reply_child_insert =p =>post('/reply/child_insert', p)     //添加子回复（已废除）
export const blog_like =p =>post('/api/blog/like', p)     //点赞
export const chat_friend =p =>post('/api/chat/friend', p)     //私信界面查询好友列表
export const chat_record =p =>post('/api/chat/record', p)     //聊天记录
export const blog_refresh =p =>post('/blog/refresh', p)   //刷新动态
export const blog_send =p =>post('/api/blog/send', p)  //发布动态
export const logout =p =>post('/api/user/logout', p)   //退出登录
export const chat_send =p =>post('/api/chat/send', p)   //私信界面发送消息
export const chat_urcount =p =>post('/api/chat/urcount', p) //查询未读消息
export const blog_upload =p =>post("/api/blog/upload", p)
