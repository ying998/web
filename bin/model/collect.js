/*
* @Author: Administrator
* @Date:   2020-07-06 13:00:54
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-07 21:53:30
*/
//收藏表
const mongoose = require('mongoose')
//创建用户集合规则
const collectSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,//获取_id的类型
		ref:'User'//将收藏人与用户集合关联
	},
	article:{
		type:mongoose.Schema.Types.ObjectId,//获取_id的类型
		ref:'Article'//将收藏人与文章集合关联
	},
	url:String,//新闻路径
	uniquekey:String,//新闻key
	photo:{
		type:String,
		default:'default.jpg'
	},//新闻图片
	title:String,
	colletDate:{
		type:Date,
		default:Date.now
	}
	
})
//创建文章集合
const Collect = mongoose.model('Collect',collectSchema)
module.exports = Collect