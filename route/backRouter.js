/*
* @Author: Administrator
* @Date:   2020-07-03 11:07:29
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 22:25:02
*/

// 反馈路由
const express = require('express')
const router = express.Router();
const Back = require('../bin/model/back')//user对象

//新增反馈
router.post('/add',(req,res,next)=>{
	Back.create(req.body)
		.then(result=>{
			res.json({code:200,isSuccess:true,msg:'反馈成功'}) 
		}).catch(errIn=>{
			res.json({code:201,isSuccess:false,msg:'反馈失败'}) 
		})
})
//删除反馈
router.post('/del',(req,res,next)=>{
	
	Back.deleteMany({_id:{$in:req.body.list}})
		.then(result=>{
			//能进入这个函数说明删除成功
			res.json({code:200,isSuccess:true,msg:'删除成功'}) 
			
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'删除失败'}) 
		})
})
//获取反馈
router.get('/list',(req,res,next)=>{
	Back.find(req.query).populate('backname')
		.then(result=>{
			console.log(result)
			res.json({code:200,isSuccess:true,msg:'获取成功',result}) 
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'获取失败'}) 
		})
})
module.exports = router