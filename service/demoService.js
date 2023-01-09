const { validate } = require("validate.js");
const { findAllDemoDao, addDemoDao, updateDemoDao, deleteDemoDao } = require("../dao/demoDao");
const { VerificationError } = require("../utils/error");


exports.findAllDemoService = async () => {
  const data = (await findAllDemoDao()).map(i => i.toJSON());
  data.forEach(i => {
    i.description = JSON.parse(i.description);
  })
  return data;
}


exports.addDemoService = async newDemoInfo => {
  newDemoInfo.description = JSON.stringify(newDemoInfo.description);

  const demoRule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    github: {
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
    order: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
  }

  const validateResult = validate.validate(newDemoInfo, demoRule);
  if (!validateResult) {
    return await addDemoDao(newDemoInfo);
  } else {
    throw new VerificationError("数据验证失败")
  }
}

exports.updateDemoService = async (id, newDemoInfo) => {
  newDemoInfo.description = JSON.stringify(newDemoInfo.description);
  const { dataValues } = await updateDemoDao(id, newDemoInfo);
  dataValues.description = JSON.parse(dataValues.description);
  return dataValues;
}

exports.deleteDemoService = async (id) => {
  return await deleteDemoDao(id);
}