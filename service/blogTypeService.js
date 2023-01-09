// DAO
const {
  addBlogTypeDao
} = require("../dao/blogTypeDao");

// tools
const { validate } = require("validate.js");
const { VerificationError } = require("../utils/error");

exports.addBlogTypeService = async newBlogTypeInfo => {
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

  const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule);
  if (!validateResult) {
    newBlogTypeInfo.articleCOunt = 0;
    return await addBlogTypeDao(newBlogTypeInfo);
  }
  else {
    throw new VerificationError("数据验证失败");
  }

}

exports.findAllBlogTypesService = async () => {

}

exports.findBlogTypeService = async blogId => {

}

exports.uploadBlogTypeService = async blogId => {

}

exports.deleteBlogTypeService = async blogId => {

}