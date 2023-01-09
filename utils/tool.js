const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const path = require('path');
const toc = require('markdown-toc');

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

exports.handleTOC = info => {
  let result = toc(info.markdownContent).json;

  function transfer(flatArr) {
    const result = [];

    class TOCItem {
      constructor(item) {
        this.name = item.content;
        this.anchor = item.slug;
        this.level = item.lvl;
        this.children = [];
      }
    }

    const stack = [];
    function handleItem(item) {
      const top = stack[stack.length - 1];
      if (!top) {
        stack.push(item);
      } else if (item.level > top.level) {
        top.children.push(item);
        stack.push(item);
      } else {
        stack.pop();
        handleItem(item);
      }
    }

    let min = 6;
    for (const i of flatArr) {
      if (i.lvl < min) {
        min = i.lvl;
      }
    }

    for (const item of flatArr) {
      const tocItem = new TOCItem(item);
      if (tocItem.level === min) {
        result.push(tocItem);
      }
      handleItem(tocItem)
    }

    return result;
  }

  info.toc = transfer(result);

  delete info.markdownContent;

  for (const i of result) {
    switch (i.lvl) {
      case 1: {
        const newStr = `<h1 id="${i.slug}">`
        info.htmlContent = info.htmlContent.replace('<h1>', newStr);
        break;
      }
      case 2: {
        const newStr = `<h2 id="${i.slug}">`
        info.htmlContent = info.htmlContent.replace('<h2>', newStr);
        break;
      }
      case 3: {
        const newStr = `<h3 id="${i.slug}">`
        info.htmlContent = info.htmlContent.replace('<h3>', newStr);
        break;
      }
      case 4: {
        const newStr = `<h4 id="${i.slug}">`
        info.htmlContent = info.htmlContent.replace('<h4>', newStr);
        break;
      }
    }
  }

  return info;
}

