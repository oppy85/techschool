const e = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{

   const authToken = req.headers.token;
   if(authToken){
      const token = authToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
        if(err){
            res.status(401).json("Token is invalid");
        }
        req.user = user;
        next();
      })
   }
   else{
     res.status(401).json("You are not authenticated");
   }
}

const verifyUser = (req, res, next) =>{
verifyToken(req, res, ()=>{
   if(req.user.id){
    next();
   }
   else{
    res.status(401).json("You are not allowed");
   }
});
}

module.exports = {verifyToken, verifyUser}