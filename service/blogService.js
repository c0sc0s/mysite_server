const { validate } = require("validate.js");
const { addBlogDao, findBlogByPageDao, findBlogByIdDao, updateBlogDao, deleteBlogDao } = require("../dao/blogDao");
const { addBlogToType, findOneBlogTypeDao } = require("../dao/blogTypeDao");
const blogTypeModel = require("../dao/model/blogTypeModel");
const { VerificationError } = require("../utils/error");

validate.validators.categoryIdIsExist = async function (val) {
  const result = await blogTypeModel.findByPk(val);
  if (result) {
    return;
  } else {
    return "Category not found"
  }
}


exports.addBlogService = async newBlogInfo => {
  newBlogInfo.toc = JSON.stringify('["a":"b"]');

  newBlogInfo.scanNumber = 0;

  const blogRule = {
    title: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    description: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    toc: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    htmlContent: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    thumb: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    createDate: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    categoryId: {
      presence: true,
      type: "integer",
      categoryIdIsExist: true,
    },
  }

  try {
    await validate.async(newBlogInfo, blogRule);
    const data = await addBlogDao(newBlogInfo);
    await addBlogToType(newBlogInfo.categoryId);
    return data;
  } catch (e) {
    throw new VerificationError("Category not found")
  }
}

exports.findBlogByPageService = async pageInfo => {
  const data = await findBlogByPageDao(pageInfo);
  const rows = data.rows.map(i => i.toJSON());
  rows.forEach(it => {
    it.toc = JSON.parse(it.toc);
  })
  return {
    "total": data.count,
    rows,
  };
}

exports.findBlogByIdService = async (id, auth) => {
  const data = await findBlogByIdDao(id);
  // 还原TOC为数组
  data.dataValues.toc = JSON.parse(data.dataValues.toc);
  // 根据 auth 判断调用场景
  if (!auth) {
    data.scanNumber++;
    await data.save();
  }
  return data;
}

exports.updateBlogService = async (id, newBlogInfo) => {
  if (newBlogInfo.htmlContent) {
    // 重新处理TOC
  }
  const { dataValues } = await updateBlogDao(id, newBlogInfo);
  return dataValues;
}

exports.deletBlogService = async id => {
  const data = await findBlogByIdDao(id);
  const categoryInfo = await findOneBlogTypeDao(data.dataValues.categoryId);
  categoryInfo.articleCount--;
  await categoryInfo.save();
  return await deleteBlogDao(id);
}