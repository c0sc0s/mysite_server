const express = require('express');
const multer = require('multer');
const { UploadError } = require('../utils/error');
const router = express.Router();
module.exports = router;

// tools
const { formatResponse } = require('../utils/tool');
const { uploading } = require('../utils/tool');

// service
router.post("/", async function (req, res, next) {
  // 上传控件的name
  uploading.single("file")(req, res, err => {
    if (err instanceof multer.MulterError) {
      // 上传文件出错
      next(new UploadError("上传文件失败,请检查文件大小控制在2MB以内"));
    } else {
      // 上传成功
      const path = "/static/uploads/" + req.file.filename;

      res.send(formatResponse(0, "", path));
    }
  });
})