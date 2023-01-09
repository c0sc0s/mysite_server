const express = require('express');
const { addDemoService, findAllDemoService, updateDemoService, deleteDemoService } = require('../service/demoService');
const router = express.Router();
module.exports = router;

// tools
const { formatResponse } = require('../utils/tool');

// Service


// 获取项目
router.get('/', async function (req, res, next) {
  const data = await findAllDemoService();
  res.send(formatResponse(0, "", data));
});

// 新增项目
router.post('/', async function (req, res, next) {
  const data = await addDemoService(req.body);
  res.send(formatResponse(0, "", data));
});

// 修改项目
router.put('/:id', async function (req, res, next) {
  const data = await updateDemoService(req.params.id, req.body);
  res.send(formatResponse(0, "", data));
});


// 删除项目
router.delete('/:id', async function (req, res, next) {
  const data = await deleteDemoService(req.params.id);
  res.send(formatResponse(0, "", data));
});