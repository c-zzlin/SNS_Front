/**
 * 模拟mock
 */


import Mock from 'mockjs'
import data from './data.json'


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