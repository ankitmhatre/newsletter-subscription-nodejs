const AppError = require('../utils/appError');
const aes = require('../utils/aes256Crypt');
const catchAsync = require('../utils/catchAsync');
const tokens = require('../modules/auth/tokens');
const NewEmail = require('../utils/emailHandler');
const User = require('../models/userModel');
const auth = require('../modules/auth/auth');







// Define the login controller
exports.login = catchAsync(async (req, res, next) => {
  var user = await auth.authenticate(req.body.email, req.body.password)

  
  if (typeof user === "string")
      return next(new AppError(user, 400))
  else if (typeof user === "object")
     auth.sendToken(user, 200, res);
})


exports.signup = catchAsync(async (req, res, next) => {

  
  
  if (!req.body.password)
      return next(new AppError("required_password"));

const newUser = await User.create(req.body);
await newUser.save();






  // const mailObj = {
  //     email: newUser.email,
  //     user_id: newUser._id,
  //     url: url,
  //     message: message
  // }


 
  auth.sendToken(newUser, 201, res);
});


