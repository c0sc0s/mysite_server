const jwt = require('jsonwebtoken');
const md5 = require('md5');

// 格式化响应数据
exports.formatResponse = function (code, msg, data) {
  return {
    code, msg, data
  }
}

// 解析token
exports.analysisToken = function (token) {
  return jwt.verify(
    token.split(" ")[1],
    md5(process.env.JWT_SECRET)
  );
}