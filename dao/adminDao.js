const adminModel = require('./model/adminModel');

exports.loginDao = async loginInfo => {
  const result = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd
    }
  });
  return result &&
  {
    id: result.id,
    loginId: result.loginId,
    name: result.name,
  };
}

exports.updateAdminDao = async function (newAdminInfo) {
  return await adminModel.update(
    newAdminInfo,
    {
      where: {
        loginId: newAdminInfo.loginId,
      }
    }
  );
}