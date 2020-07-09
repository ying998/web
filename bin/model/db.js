/*
* @Author: Administrator
* @Date:   2020-06-27 13:38:11
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-27 17:14:47
*/
const mongoose = require('mongoose')
//连接而数据库
mongoose.connect('mongodb://localhost/classweb',{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(res=>{console.log('数据库连接成功')})
.catch(err=>{console.log(err,'数据库连接失败')})

