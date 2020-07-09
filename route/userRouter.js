/*
* @Author: Administrator
* @Date:   2020-06-27 13:16:01
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 23:24:57
*/
// 图片路径存储有缺陷
const express = require('express')
const router = express.Router();
const User = require('../bin/model/user')//user对象

var formidable=require('formidable');//上传功能的插件
var path=require('path');
var fs=require('fs');
//登录路由
router.post('/login',(req,res,next)=>{
	User.findOne(req.body)
		.then(result=>{
			//账号不存在
			if(result == null){
				res.json({code:201,isSuccess:false,msg:'账号或密码错误'}) 
				
			}else{
				res.json({code:200,isSuccess:true,msg:'登录成功',result}) 
			}
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'登录失败'}) 
		})
})
//注册路由
router.post('/register',(req,res,next)=>{
	// 判断数据库是否存在该账号
	User.findOne({username:req.body.username})
		.then(resOut=>{
			//不存在账号---创建用户
			if(resOut == null){
				User.create(req.body)
					.then(resIn=>{
						res.json({code:200,isSuccess:true,msg:'注册成功'}) 
					}).catch(errIn=>{
						res.json({code:201,isSuccess:false,msg:'注册失败'}) 
					})
			}else{
				res.json({code:202,isSuccess:false,msg:'该账号已被注册'}) 
			}
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'注册失败'}) 
		})
})
//个人信息获取路由
router.get('/info',(req,res,next)=>{
	User.findOne(req.query)
		.then(result=>{
			//账号不存在
			if(result == null){
				res.json({code:201,isSuccess:false,msg:'个人信息获取失败'}) 
				
			}else{
				res.json({code:200,isSuccess:true,msg:'个人信息获取成功',result}) 
			}
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'个人信息获取失败'}) 
		})
})
//个人信息修改路由
router.post('/modifyInfo',(req,res,next)=>{
	res.setHeader('Content-type','multipart/form-data;charset=utf-8')
	var uploadDir= './public/uploads/';
	var form=new formidable.IncomingForm();
	 //文件的编码格式
	 form.encoding='utf-8';
	 //文件的上传路径
	 form.uploadDir=uploadDir;
	 //文件的后缀名
	 form.extensions=true;
	 form.parse(req, (err, fields, files) =>{
	 //fields上传的string类型的信息
	 //files为上传的文件
	 	//写入数据库的信息
	  	var user={
		   	username:fields.username,
            email:fields.email,
            phone:fields.phone,
            birthday:fields.birthday,
            introduction:fields.introduction,
            sex:fields.sex
	  	};
	  	
		  	var file=files.portrait;
		  	console.log(file)
		 if(file!==undefined){
		  	console.log(111)
		  		
		  	
	   		var oldpath = path.normalize(file.path);//返回正确格式的路径
	 		
	   		var newfilename = user.username+file.name;
	   		var newpath = uploadDir+newfilename;

	   		//更新照片
   			fs.rename(oldpath,newpath,function(err){
			   		user.portrait = newfilename
			   		console.log(user.portrait)
			   		// resolve(user)
			   		User.updateOne({username:user.username},user)
			   			.then(result=>{
						//账号修改失败
						console.log(result)
							if(!result.nModified){
								res.json({code:201,isSuccess:false,msg:'修改失败'}) 
							}else{
								res.json({code:200,isSuccess:true,msg:'修改成功'}) 
							}
						}).catch(errOut=>{
							console.log(errOut)
							res.json({code:201,isSuccess:false,msg:'修改失败'}) 
						})
			   		
			})
	   		
	   	}else{
	   		User.updateOne({username:user.username},user)
	   			.then(result=>{
				//账号修改失败
				console.log(result)
					if(!result.nModified){
						res.json({code:201,isSuccess:false,msg:'修改失败'}) 
					}else{
						res.json({code:200,isSuccess:true,msg:'修改成功'}) 
					}
				}).catch(errOut=>{
					console.log(errOut)
					res.json({code:202,isSuccess:false,msg:'修改失败'}) 
				})
	   	}
	 })
})
//修改密码路由
router.post('/modifyPsw',(req,res,next)=>{
	User.findOne({username:req.body.username})
		.then(resOut=>{
			if(req.body.oldpsw != resOut.password){
				res.json({code:201,isSuccess:false,msg:'原密码错误'})
			}else{
				User.updateOne({username:req.body.username},{password:req.body.newpsw})
					.then(result=>{
						if(result.nModified){
							res.json({code:200,isSuccess:true,msg:'修改成功'}) 
						}else{
							res.json({code:201,isSuccess:false,msg:'修改失败'}) 
						}
						console.log(result)
					}).catch(errOut=>{
						res.json({code:202,isSuccess:false,msg:'修改失败'}) 
					})
			}
		}).catch(errOut=>{
			res.json({code:202,isSuccess:false,msg:'修改失败'}) 
		})
	
			
		
})
module.exports = router