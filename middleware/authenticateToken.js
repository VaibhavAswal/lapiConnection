const jwt = require("jsonwebtoken");
module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    throw {
      status: 401,
      message:
        "The client must authenticate itself to get the requested response!",
    };
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      throw {
        status: 418,
        message:
          "The client does not have access rights to the content or client is unverifiable and or unknown!",
        error: error,
      };
    }
    req.id = user.id;
    next();
  });
};
