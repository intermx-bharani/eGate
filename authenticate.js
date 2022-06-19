const jwt = require ('jsonwebtoken');
const { errorHandler, successHandler } = require("./helper/handlers");
require('dotenv').config()

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) errorHandler(req, res, {message:"Token not found"}, 403);
    let verify = jwt.verify(token,process.env.USER_VERIFICATION_TOKEN_SECRET,(err,user)=>{
      if(err) errorHandler(req, res, {message:"unauthorized user"}, 403);
        req.user = user;
      next()
   })
  }

  module.exports = {
    authenticateToken
  }