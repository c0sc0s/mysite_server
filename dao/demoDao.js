const demoModel = require("./model/demoModel");

exports.findAllDemoDao = async () =>
  await demoModel.findAll();

exports.addDemoDao = async newDemoInfo =>
  (await demoModel.create(newDemoInfo)).dataValues;

exports.updateDemoDao = async (id, newDemoInfo) => {
  await demoModel.update(newDemoInfo, {
    where: {
      id,
    }
  });
  return demoModel.findByPk(id);
}

exports.deleteDemoDao = async id => {
  await demoModel.destroy({
    where: {
      id
    }
  });
}