const express = require('express');
const router = express.Router();
module.exports = router;

// tools
const { formatResponse } = require('../utils/tool');

// Service
const { findBannerService, updateBannerService } = require('../service/bannerService');

// 获取首页标语
router.get('/', async function (req, res, next) {
  const data = await findBannerService();
  res.send(formatResponse(0, "", data));
});

// 设置首页标语
router.post('/', async function (req, res, next) {
  await updateBannerService(req.body);
  res.send(formatResponse(0, "", req.body))
});