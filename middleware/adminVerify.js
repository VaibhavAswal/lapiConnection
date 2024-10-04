const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async function optionalAuth(req, res, next) {
  try {
    const user = await User.findById(req.id);
    if (user.role === "admin" || user.role === "superAdmin") {
      next();
    } else {
      throw {
        status: 403,
        message: "You are not authorized to perform this action",
      };
    }
  } catch (error) {
    next(error);
  }
};
