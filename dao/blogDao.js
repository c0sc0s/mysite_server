const blogModel = require('./model/blogModel');
const blogTypeModel = require('./model/blogTypeModel');

exports.addBlogDao = async newBlogInfo => {
  const { dataValues } = await blogModel.create(newBlogInfo);
  return dataValues;
}

exports.findBlogByPageDao = async pageInfo => {
  if (pageInfo.categoryid) {
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: pageInfo.categoryid
          }
        }
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: +pageInfo.limit,
    })
  } else {
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
        }
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: +pageInfo.limit,
    })
  }
}

exports.findBlogByIdDao = async id => {
  return await blogModel.findByPk(id, {
    include: [
      {
        model: blogTypeModel,
        as: "category",
      }
    ]
  })
}

exports.updateBlogDao = async (id, newBlogInfo) => {
  await blogModel.update(newBlogInfo, {
    where: {
      id,
    }
  });
  return await blogModel.findByPk(id);
}

exports.deleteBlogDao = async id => {
  return await blogModel.destroy({
    where: {
      id,
    }
  })
}