const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
require("dotenv").config()

module.exports.requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({message:"You must be logged in"});
  }

  const token = authorization.replace("Bearer ","");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({message:"Invalid token"});
    }
    const {_id} = payload
    User.findById(_id).then((userdata)=>{
        req.user = userdata
        next()
    })
  });
};