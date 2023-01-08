const express = require('express');
const router = express.Router();
module.exports = router;

// tools
const { formatResponse, analysisToken } = require('../utils/tool');

// Service
const { loginService, updateAdminService } = require("../service/adminService")

const { VerificationError } = require('../utils/error');

// 登录
router.post('/login', async function (req, res, next) {
  // 验证码验证
  if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    throw new VerificationError("验证码错误");
  }

  // 账号密码验证
  const result = await loginService(req.body);

  result.token && res.setHeader("authentication", result.token);
  res.send(formatResponse(0, "", result.data));
});
// 恢复登录
router.get('/whoami', async function (req, res, next) {
  const token = analysisToken(req.get("authorization"));
  res.send(formatResponse(0, "", {
    loginId: token.loginId,
    name: token.name,
    id: token.id,
  }));
});

// 修改信息
router.put("/", async function (req, res, next) {
  const result = await updateAdminService(req.body);
  res.send(formatResponse(0, "", result));
})