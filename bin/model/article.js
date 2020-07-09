/*
* @Author: Administrator
* @Date:   2020-07-03 21:31:57
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-07 10:49:21
*/
//文章表
const mongoose = require('mongoose')
//创建用户集合规则
const articleSchema = new mongoose.Schema({
	title:String,
	author:{
		type:mongoose.Schema.Types.ObjectId,//获取_id的类型
		ref:'User'//将反馈人与用户集合关联
	},
	url:{
		type:String,
		default:''
	},
	punishDate:{
		type:Date,
		default:Date.now
	},
	thumbnail_pic_s:{
		type:String,
		default:''
	},
	thumbnail_pic_s02:{
		type:String,
		default:''
	},
	thumbnail_pic_s03:{
		type:String,
		default:''
	},
	photos:[String]
	
})
//创建文章集合
const Article = mongoose.model('Article',articleSchema)
module.exports = Article