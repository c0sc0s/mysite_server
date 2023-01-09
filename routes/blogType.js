const express = require('express');
const router = express.Router();
module.exports = router;

// tools
const { formatResponse } = require('../utils/tool');

// Service
const {
  addBlogTypeService,
  findAllBlogTypesService,
  findBlogTypeService,
  uploadBlogTypeService,
  deleteBlogTypeService
} = require('../service/blogTypeService');

// 添加分类
router.post('/', async function (req, res, next) {
  const data = await addBlogTypeService(req.body);
  res.send(formatResponse(0, "", data));
});

// 获取所有分类
router.get('/', async function (req, res, next) {
  findAllBlogTypesService();
});

// 获取某个文章的分类
router.get('/:id', async function (req, res, next) {
  findBlogTypeService(req.params.id);
});

// 修改某个文章的分类
router.put('/:id', async function (req, res, next) {
  uploadBlogTypeService(req.params.id);
});

// 删除某个文章的分类
router.delete('/:id', async function (req, res, next) {
  deleteBlogTypeService(req.params.id)
});