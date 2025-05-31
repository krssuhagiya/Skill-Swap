require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
