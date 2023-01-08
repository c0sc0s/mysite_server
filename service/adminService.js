// tools
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { VerificationError } = require('../utils/error');

// Dao
const { loginDao, updateAdminDao } = require("../dao/adminDao");

exports.loginService = async function (loginInfo) {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  const data = await loginDao(loginInfo);

  if (data) {
    let loginPeriod = +loginInfo.remember || 1;
    // 生成token
    const token = jwt.sign(
      {
        id: data.id,
        loginId: data.loginId,
        name: data.name,
      },
      md5(process.env.JWT_SECRET),
      {
        expiresIn: 60 * 60 * 24 * loginPeriod
      }
    );
    return {
      token,
      data
    }
  }

  return null;
}

exports.updateAdminService = async function (accountInfo) {
  // 验证旧密码
  const adminInfo = await loginDao({
    loginId: accountInfo.loginId,
    loginPwd: md5(accountInfo.oldLoginPwd),
  });

  if (!adminInfo) {
    throw new VerificationError("旧密码不正确");
  } else {
    const newPwd = md5(accountInfo.loginPwd);
    const newAdminInfo = {
      name: accountInfo.name,
      loginId: accountInfo.loginId,
      loginPwd: newPwd
    };
    await updateAdminDao(newAdminInfo);
    return {
      loginId: accountInfo.loginId,
      name: accountInfo.name,
    };
  };
}