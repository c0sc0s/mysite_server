const express = require('express');
const router = express.Router();
module.exports = router;

// tools
const { formatResponse } = require('../utils/tool');

// Service
const { addBlogService, findBlogByPageService, findBlogByIdService, updateBlogService, deletBlogService } = require('../service/blogService');


// 添加博客
router.post('/', async function (req, res, next) {
  const data = await addBlogService(req.body);
  res.send(formatResponse(0, "", data));
});

// 分页获取博客
router.get('/', async function (req, res, next) {
  const data = await findBlogByPageService(req.query);
  res.send(formatResponse(0, "", data));
});

// 获取其中一个博客
router.get('/:id', async function (req, res, next) {
  const reqHeaders = req.headers;
  const data = await findBlogByIdService(req.params.id, reqHeaders.authorization)
  res.send(formatResponse(0, "", data));
});

// 修改其中一个博客
router.put('/:id', async function (req, res, next) {
  const data = await updateBlogService(req.params.id, req.body);
  res.send(formatResponse(0, "", data));
});

// 删除其中一个博客
router.delete('/:id', async function (req, res, next) {
  const data = await deletBlogService(req.params.id);
  res.send(formatResponse(0, "", data));
});