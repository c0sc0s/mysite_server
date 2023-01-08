const { formatResponse } = require("../utils/tool")

class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  // 格式化返回错误信息
  toResponseJSON() {
    return formatResponse(this.code, this.message, null)
  }
}
exports.ServiceError = ServiceError;

// File upload error
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, 413);
  }
}

// Prohibit access error
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, 401);
  }
}

// Verification error
exports.VerificationError = class extends ServiceError {
  constructor(message) {
    super(message, 406);
  }
}

// Not Found error
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super("Not Found", 406);
  }
}

// unknown error
exports.UnKnownError = class extends ServiceError {
  constructor() {
    super("Unknown Error", 500);
  }
}

