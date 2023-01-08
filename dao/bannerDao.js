const bannerModel = require("./model/bannerModel")

exports.findBannerDao = async () => {
  const data = await bannerModel.findAll();
  return data.map(i => i.toJSON())
}

exports.updateBannerDao = async newBannerData => {
  await bannerModel.destroy({
    truncate: true,
  })
  return await bannerModel.bulkCreate(newBannerData);
}