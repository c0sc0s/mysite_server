const blogTypeModel = require("./model/blogTypeModel")

// 添加博客分类
exports.addBlogTypeDao = async newBlogTypeInfo => {
  const { dataValues } = await blogTypeModel.create(newBlogTypeInfo);
  return dataValues;
}