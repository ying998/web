/*
* @Author: Administrator
* @Date:   2020-06-27 13:15:45
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-06 13:12:49
*/
const express = require('express')

const app = express()
//引入数据库
require('./bin/model/db')

var path=require('path');

//跨域问题解决方面
const cors = require('cors'); 
// app.use(cors())
app.use(cors({
  origin: ['http://localhost:8080','http://localhost:8081','http://v.juhe.cn/toutiao'],//可设置多个
  credentials: true//允许客户端携带验证信息
}))
//post请求内容转化为json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'/')))//引入用户请求路由
const userRouter = require('./route/userRouter')
app.use('/',userRouter)

const backRouter = require('./route/backRouter')
app.use('/back',backRouter)

const articleRouter = require('./route/articleRouter')
app.use('/article',articleRouter)

const collectRouter = require('./route/collectRouter')
app.use('/collect',collectRouter)

app.listen(3000)
console.log('服务器已启动')