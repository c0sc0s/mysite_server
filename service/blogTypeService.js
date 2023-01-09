// DAO
const {
  addBlogTypeDao,
  findAllBlogTypeDao,
  findOneBlogTypeDao,
  updateBlogTypeDao,
  deleteBlogTypeDao,
} = require("../dao/blogTypeDao");

// tools
const { validate } = require("validate.js");
const { VerificationError } = require("../utils/error");


// 数据验证规则
const blogTypeRule = {
  name: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  order: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  }
}

exports.addBlogTypeService = async newBlogTypeInfo => {
  const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule);
  if (!validateResult) {
    newBlogTypeInfo.articleCount = 0;
    return await addBlogTypeDao(newBlogTypeInfo);
  }
  else {
    throw new VerificationError("数据验证失败");
  }
}

exports.findAllBlogTypesService = async () => {
  const data = await findAllBlogTypeDao();
  return data.sort((a, b) => a.order - b.order);
}

exports.findOneBlogTypeService = async blogId => {
  const data = await findOneBlogTypeDao(blogId)
  return data.dataValues;
}

exports.uploadBlogTypeService = async (blogId, newBlogTypeInfo) => {
  const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule);
  if (!validateResult) {
    newBlogTypeInfo.articleCount = 0;
    return await updateBlogTypeDao(blogId, newBlogTypeInfo);
  } else {
    throw new VerificationError("数据验证失败");
  }
}

exports.deleteBlogTypeService = async blogId => {
  return await deleteBlogTypeDao(blogId);
}