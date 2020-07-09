/*
* @Author: Administrator
* @Date:   2020-07-03 11:04:18
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 22:51:35
*/
// 反馈表
const mongoose = require('mongoose')

//创建反馈集合规则
const backSchema = new mongoose.Schema({
	backname:{
		type:mongoose.Schema.Types.ObjectId,//获取_id的类型
		ref:'User'//将反馈人与用户集合关联
	},
	content:{
		type:String,
		default:''
	},
	backTime:{
		type:Date,
		default:Date.now
	}
	
})
//创建用户集合
const Back = mongoose.model('Back',backSchema)
module.exports = Back