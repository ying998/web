/*
* @Author: Administrator
* @Date:   2020-07-03 21:30:40
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-08 10:50:14
*/
// 图片路径存储有缺陷
const express = require('express')
const router = express.Router();
const Article = require('../bin/model/article')//article对象

var formidable=require('formidable');//上传功能的插件
var path=require('path');
var fs=require('fs');
var multiparty = require('multiparty')//返回的form对象都是数组类型
//文章发布路由
router.post('/add',async(req,res,next)=>{
	//接收处理后的对象
	let article = await saveImg(req,res,next);
	delete article._id;
		console.log(article)

	Article.create(article)
		.then(result=>{
	//发表成功
		res.json({code:200,isSuccess:true,msg:'发表成功'}) 
	}).catch(errOut=>{
		console.log(errOut)
		res.json({code:201,isSuccess:false,msg:'发表失败'}) 
	})

})

//文章获取路由
router.get('/list',(req,res,next)=>{
	Article.find(req.query).populate('author')//提交author字段
		.then(result=>{
			res.json({code:200,isSuccess:true,msg:'获取成功',result}) 
		}).catch(errOut=>{
			res.json({code:201,isSuccess:false,msg:'获取失败'}) 
		})
})
//删除文章
router.post('/del',(req,res,next)=>{
	Article.find({_id:{$in:req.body.list}})
		.then(result=>{
			console.log(result)
			result.forEach(item=>{
				item.photos.forEach(qitem=>{
					if(qitem!='default.jpg'){
						deleteFile('../public/articleImgs/'+qitem,false)
					}
				})
			})
		}).catch(errOut=>{
			console.log(errOut)
		})
	Article.deleteMany({_id:{$in:req.body.list}})
		.then(result=>{
			//能进入这个函数说明删除成功
			res.json({code:200,isSuccess:true,msg:'删除成功'}) 
			
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'删除失败'}) 
		})
})
//修改文章
router.post('/modify',async(req,res,next)=>{
	let article = await saveImg(req,res,next);
	console.log(article)
	Article.updateOne({_id:article.id},article)
		.then(result=>{
			if(!result.nModified){
				res.json({code:201,isSuccess:false,msg:'无修改'}) 
			}else{
				res.json({code:200,isSuccess:true,msg:'修改成功'}) 
			}
			
		}).catch(errOut=>{
			console.log(errOut)
			res.json({code:201,isSuccess:false,msg:'修改失败'}) 
		})
})
//处理图片上传函数-------修改图片有bug
async function saveImg(req,res,next){
	var form = new multiparty.Form({
        encoding:"utf-8",
        uploadDir:'./public/articleImgs/',  //文件上传地址
        keepExtensions:true  //保留后缀
     });
	 var addArticle = {}
	 await new Promise((resolve,reject)=>{
	 	 form.parse(req, (err, fields, files) =>{
		 	res.setHeader('Content-type','text/plain;charset=utf-8')
		 //fields上传的string类型的信息
		 //files为上传的文件
		 	//写入数据库的信息
		  	var article={
			   	title:fields.title.toString(),
	            author:fields.author.toString(),
	            url:fields.url.toString(),
	            photos:['default.jpg','default.jpg','default.jpg'],
	            id:''
		  	}
		  	if(fields.hasOwnProperty('id')){
		  		article.id = fields.id.toString()
		  	}
		  	if(fields.hasOwnProperty('photos')){
		  		for(var i in fields.photos){
			  		article.photos[i] = fields.photos[i]
			  		
			  	}
		  	}
		  	
		  	
		  	for(let j in files.photos){
		  		let names = path.normalize(files.photos[j].path).split("\\")
		  		if(fields.hasOwnProperty('photos')){
		  			article.photos[Number(i)+1] = names[names.length-1]	
		  		}else{
		  			article.photos[j] = names[names.length-1]	  			
		  		}
	  		}
	  		resolve(article) 		
		 })
	 }).then(result=>{
	 	addArticle =  result
	 }).catch(error=>{
	 	console.log(error)
	 })
	 return addArticle
}
//删除图片
/**
 * @param { delPath：String } （需要删除文件的地址）
 * @param { direct：Boolean } （是否需要处理地址）
 */
function deleteFile(delPath, direct) {
    delPath = direct ? delPath : path.join(__dirname, delPath)
    try {
        /**
         * @des 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
            console.log(111)
        } else {
            console.log('inexistence path：', delPath);
        }
    } catch (error) {
        console.log('del error', error);
    }
}
module.exports = router