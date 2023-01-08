const express = require('express');
const router = express.Router();
module.exports = router;

// Service
const { getCaptchaService } = require('../service/captchaService');

router.get('/', async function (req, res, next) {
  // 生成验证码
  const captcha = await getCaptchaService();
  req.session.captcha = captcha.text;
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(captcha.data);
});