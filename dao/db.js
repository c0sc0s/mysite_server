// 连接数据库
const sequelize = require("./dbConnect");

// models
const adminModel = require("./model/adminModel");
const bannerModel = require("./model/bannerModel");
const blogTypeModel = require("./model/blogTypeModel");
const blogModel = require("./model/blogModel");
const demoModel = require("./model/demoModel");

const md5 = require("md5");
(async function () {
  blogTypeModel.hasMany(blogModel, {
    foreignKey: "categoryId",
    targetKey: "id"
  });

  blogModel.belongsTo(blogTypeModel, {
    foreignKey: "categoryId",
    targetKey: "id",
    as: "category"
  })


  // 同步
  await sequelize.sync({
    alter: true,
  })

  // 数据初始化
  if (!await adminModel.count()) {
    await adminModel.create({
      loginId: 'admin',
      name: '管理员',
      loginPwd: md5('1234'),
    });
    console.log("admin初始化完毕...");
  }

  if (!await bannerModel.count()) {
    await bannerModel.bulkCreate([
      {
        "midImg": "./static/imgs/1.jpg",
        "bigImg": "./static/imgs/1.jpg",
        "title": "life is love",
        "description": "宿舍照片",
      },
      {
        "midImg": "./static/imgs/2.jpg",
        "bigImg": "./static/imgs/2.jpg",
        "title": "img2",
        "description": "img2",
      },
      {
        "midImg": "./static/imgs/3.jpg",
        "bigImg": "./static/imgs/3.jpg",
        "title": "img3",
        "description": "img3",
      },
    ])
    console.log("banner初始化完毕...");
  }
})();