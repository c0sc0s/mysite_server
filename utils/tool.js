const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const path = require('path');

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

// 图片上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/static/uploads');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname)
    const newName = new Date().getTime() + Math.floor(Math.random() * 9000 + 1000) + extname;
    cb(null, newName)
  }
})

exports.uploading = multer({
  storage,
  limits: {
    fileSize: 2000000,
    files: 1
  }
})