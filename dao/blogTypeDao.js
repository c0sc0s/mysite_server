const blogTypeModel = require("./model/blogTypeModel")

exports.addBlogTypeDao = async newBlogTypeInfo => {
  const { dataValues } = await blogTypeModel.create(newBlogTypeInfo);
  return dataValues;
}

exports.findAllBlogTypeDao = async () => {
  return await blogTypeModel.findAll();
}

exports.findOneBlogTypeDao = async id => {
  return await blogTypeModel.findByPk(id);
}

exports.updateBlogTypeDao = async (id, newBlogTypeInfo) => {
  await blogTypeModel.update(newBlogTypeInfo, {
    where: {
      id
    },
  });
  const { dataValues } = await blogTypeModel.findByPk(id);
  return dataValues;
}

exports.deleteBlogTypeDao = async id => {
  return await blogTypeModel.destroy({
    where: { id },
  })
}

exports.addBlogToType = async id => {
  const data = await blogTypeModel.findByPk(id);
  data.articleCount++;
  await data.save();
  return;
}