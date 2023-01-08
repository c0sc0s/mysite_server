const { findBannerDao, updateBannerDao } = require("../dao/bannerDao");

exports.findBannerService = async () => {
  return await findBannerDao();
};

exports.updateBannerService = async newBannerData => {
  return await updateBannerDao(newBannerData);
}

