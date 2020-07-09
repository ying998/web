/*
* @Author: Administrator
* @Date:   2020-06-27 13:37:52
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 11:06:17
*/
//用户表
const mongoose = require('mongoose')
//创建用户集合规则
const userSchema = new mongoose.Schema({
	portrait:{
		type:String,
		default:''
	},
	username:{
		type:String,
		// minlength:[2,'账号长度不能小于2'],
		// maxlength:[10,'文章长度超过10'],
		require:true
	},
	password:{
		type:String,
		minlength:[6,'密码长度不能小于6'],
		require:true
	},
	sex:{
		type:String,
		default:'男'
	},
	email:{
		type:String,
		default:''
	},
	phone:{
		type:String,
		default:''
	},
	birthday:{
		type:Date,
		default:Date.now
	},
	introduction:{
		type:String,
		default:''
	}
	
})
//创建用户集合
const User = mongoose.model('User',userSchema)
module.exports = User