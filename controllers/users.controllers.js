const User = require("../models/usermodel");
const asyncMiddleware = require("../Middleware/middleware");
const {sendMail} = require("../utils/sendMail")
const {hashPassword} = require('../Passwords/hashPassword');
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../Passwords/comparePassword");
require("dotenv").config();


exports.signup_Func = asyncMiddleware(async (req, res) => { //function to signup a new user
  let user = await User.findOne({ email: req.body.email }); //find user by email
  if (user) return res.status(400).send("User already registered."); 

  user = new User({ // if not found take credentials
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await hashPassword(req.body.password); //hash the password
  let result = await user.save(); //save the new record

  res.send(result); //to display the newly added record
});

exports.login_Func = asyncMiddleware(async (req, res) => { //function for login to grant access to users
  let user = await User.findOne({ email: req.body.email }); //find user by email
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await comparePassword(req.body.password, user.password); //compare entered password with database password
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => { //generates token for signed in users
    res.json({ user, token });
  });
});

exports.change_Password = asyncMiddleware(async (req, res) => { //function to change password
  let user = await User.findById(req.userID); //find user by ID
  if (!user) return res.status(400).send("User not Found");

  const validPassword = await comparePassword(req.body.oldPassword, user.password); //compare entered password with database password
  if (!validPassword) {
    return res.status(401).send("Invalid Password");
  } else {
    user.password = await hashPassword(req.body.newPassword); //hash the newly entered password
    await user.save(); //save the new record
    res.send("Password Saved Successfully"); //to display the newly added record    
  }
});

exports.forgot_Password = asyncMiddleware(async (req, res) => { //function if user forgot password

  let user = await User.findOne({ email: req.body.email }); //find user by email
  if (!user) return res.status(404).send("Invalid email");
  user.token = await jwt.sign({ id: user._id.valueOf() }, process.env.SECRET_KEY, {expiresIn: "60m",}); //generate token and add signature
  await user.save();
  
  const mailSent = sendMail(user.email, user.token) //fuction for sending mail
  if(!mailSent) return res.status(400).send("Mail not Sent")
    
  res.send("Password Reset Link Sent= "+ user.token);
});

exports.reset_Password = asyncMiddleware(async (req, res) => { //function to reset password
  
  jwt.verify(req.body.token, process.env.SECRET_KEY, async(err, authData) => { //verify token with valid signature
  if(err) return res.status(400).send(err);
  let user = await User.findById({ _id: authData.id }); //find user according to ID
  if (!user) return res.status(400).send("Email not Found in Database");
  if(req.body.token != user.token) return res.status(400).send("Invalid Token")
  if(req.body.newPassword.length == 0 ) return res.status(400).send("Invalid Password")
      
  user.password = await hashPassword(req.body.newPassword);//hash the newly entered password
  await user.save();
  res.send("Password Saved Successfully");

  })
});
