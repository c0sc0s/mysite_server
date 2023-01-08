// 引入工具/第三方包
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { expressjwt } = require('express-jwt');
var md5 = require('md5');
const session = require('express-session');
const { ForbiddenError, VerificationError, ServiceError, UnKnownError } = require('./utils/error');


// 全局配置
require("dotenv").config();
require("express-async-errors")

// 数据库连接
require("./dao/db");

// 创建服务器实例
var app = express();

// 中间件注册
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 验证token中间件
app.use(expressjwt({
  secret: md5(process.env.JWT_SECRET),
  algorithms: ["HS256"]
}).unless({
  // 不需要进行token验证的路由
  path: [
    { url: "/api/admin/login", methods: ["POST"] },
    { url: "/res/captcha", method: ["GET"] },
    { url: "/api/banner", method: ["GET"] }
  ]
}))

// 路由注册
app.use("/api/admin", require("./routes/admin"));
app.use("/res/captcha", require("./routes/captcha"));
app.use("/api/banner", require("./routes/banner"));

// 错误处理中间件
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send(new ForbiddenError("未登录或者登录过期").toResponseJSON())
  } else if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnKnownError().toResponseJSON());
  }
});

module.exports = app;
