/*
* @Author: Administrator
* @Date:   2020-07-06 13:09:31
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-07 22:04:02
*/
// 收藏路由
const express = require('express')
const router = express.Router();
const Collect = require('../bin/model/collect')//user对象

//新增收藏
router.post('/add',(req,res,next)=>{
	Collect.create(req.body)
		.then(result=>{
			console.log(result)
			res.json({code:200,isSuccess:true,msg:'已添加收藏'}) 
		}).catch(errIn=>{
			res.json({code:201,isSuccess:false,msg:'收藏失败'}) 
		})
})
//取消收藏
router.post('/cancel',(req,res,next)=>{
	
	Collect.deleteOne(req.body)
		.then(result=>{
			//能进入这个函数说明删除成功
			res.json({code:200,isSuccess:true,msg:'已取消收藏'}) 
			
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'操作失败'}) 
		})
})
//删除收藏
router.post('/del',(req,res,next)=>{
	
	Collect.deleteMany({_id:{$in:req.body.list}})
		.then(result=>{
			//能进入这个函数说明删除成功
			res.json({code:200,isSuccess:true,msg:'删除成功'}) 
			
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'删除失败'}) 
		})
})
//查找收藏
router.get('/list',(req,res,next)=>{
	Collect.find(req.query).populate('article')
		.then(result=>{
			console.log(result)
			res.json({code:200,isSuccess:true,msg:'获取成功',result}) 
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'获取失败'}) 
		})
})
module.exports = router