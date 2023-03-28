const jwt = require('jsonwebtoken')
require("dotenv").config();

exports.verifyToken = async function(req, res, next) { // function to verify if token is authentic
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') { //to check the if the typeof header is undefined
      const bearer = bearerHeader.split(' '); //split where there is a space and add to bearer
      const bearerToken = bearer[1]; //take the value on second index
      req.token = bearerToken;
      jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => { //use jwt built in function to verify the authenticity of token
        if(err) {
          next(err)
        }
      else{
        req.userID= authData.user._id; //after extracting the id from jwt we store it in req.UserID
      }});
      next();
    } else {
      // Forbidden
      res.status(401).send("Unauthorized Access");
    }
  }