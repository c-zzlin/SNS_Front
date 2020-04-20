/**
 * 模拟mock
 */


import Mock from 'mockjs'
import data from './data.json'
import Msg from './msg.json'
import Content from './content.json'
import Head from './head.json'
import User from './User.json'
import Friend from './friend.json'
import Response from './Response.json'
//返回接口

Mock.mock('/user/query_myfriend',data.friend)
Mock.mock('/user/query_mes',	  { "data":{ "msg|5":[
			{
				"uid|1608030149-1608030150":1608030149,
				"pmdatetime":'@time("HH:mm:ss")',
				"pmcontent":'@character("upper")'
			}


		]}})

//进入主页查询消息接口
Mock.mock('/Msg/query_msg_all',Msg.msg)
//返回评论接口
Mock.mock('/Msg/query_contentbyMid',Content.content)
//头部导航接口
Mock.mock('/user/query_myself_2',Head.myself)
Mock.mock('/Msg/query_nav_msg',Head.navMsg)
Mock.mock('/user/login',User.user)
Mock.mock('/user/find',Friend.friend)
Mock.mock('/friend/list',Friend.friend)
Mock.mock('/friend/commit',Friend.friend)
Mock.mock('/friend/add',Response.data)
Mock.mock('/friend/delete',Response.data)
Mock.mock('/friend/confirm',Response.data)
Mock.mock('/blog/search',Msg.msg)
Mock.mock('/comment/search',Content.content)
Mock.mock('/comment/insert',Response.data)
Mock.mock('/reply/insert',Response.data)
Mock.mock('/reply/child_insert',Response.data)
Mock.mock('/blog/like',Response.data)
Mock.mock('/chat/friend',data.friend)
Mock.mock('/blog/refresh',Msg.msg)
Mock.mock('/blog/send',Response.data)
Mock.mock('/blog/img',Msg.send)

Mock.mock('/chat/record',{  "data":{"msg|5":[
    {
      "user_id|1608030149-1608030150":1608030149,
      "datetime":'@time("HH:mm:ss")',
      "content":'@character("upper")'
    }

  ]}})
