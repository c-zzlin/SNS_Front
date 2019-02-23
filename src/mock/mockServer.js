/**
 * 模拟mock
 */


import Mock from 'mockjs'
import data from './data.json'
import Msg from './msg.json'
import Content from './content.json'
import Head from './head.json'
//返回接口
Mock.mock('/user/query_myself',data.user)
Mock.mock('/user/query_myfriend',data.friend)
Mock.mock('/user/query_mes',	  {  "msg|5":[
			{
				"uid|1608030149-1608030150":1608030149,
				"pmdatetime":'@time("HH:mm:ss")',
				"pmcontent":'@character("upper")'
			}
			
			
		]})
		
//进入主页查询消息接口
Mock.mock('/Msg/query_msg_all',Msg.msg)
//返回评论接口
Mock.mock('/Msg/query_contentbyMid',Content.content)
//头部导航接口
Mock.mock('/user/query_myself_2',Head.myself)
Mock.mock('/Msg/query_nav_msg',Head.navMsg)