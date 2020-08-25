const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

async function auth(req, res, next) {
  try {
    if (!req.cookies.jwt) {
      res.redirect("/");
    }
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      res.redirect("/");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = auth;
