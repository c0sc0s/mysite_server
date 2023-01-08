const svgCaptcha = require('svg-captcha');

exports.getCaptchaService = async function () {
  return svgCaptcha.create({
    size: 4,
    ignoreChars: "iIl10oO",
    noise: 6,
    color: true,
  })
}