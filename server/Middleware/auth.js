const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Getting Token from the Header
  const token = req.header("x-auth-token");

  // No Token Check
  if (!token) {
    return res.status(401).json({ info: "No token, authorization denied" });
  }

  //Token Verification
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ info: "Invalid Token" });
  }
};
