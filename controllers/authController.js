const AppError = require('../utils/appError');
const aes = require('../utils/aes256Crypt');
const catchAsync = require('../utils/catchAsync');
const tokens = require('../modules/auth/tokens');
const NewEmail = require('../utils/emailHandler');
const User = require('../models/userModel');
const auth = require('../modules/auth/auth');





const sendToken = (user, statusCode, res) => {

  var access_token = tokens.createAccessToken(user);
  var refresh_token = tokens.createRefreshToken(user._id);
  var enc_access_token = aes.encrypt(access_token, `${process.env.TOKEN_SECRET_KEY}`);
  var enc_refresh_token = aes.encrypt(refresh_token, `${process.env.TOKEN_SECRET_KEY}`);

  res.status(statusCode).json({
      status: 'success',
      data: {
          access_token: encodeURIComponent(enc_access_token),
          refresh_token: encodeURIComponent(enc_refresh_token),
          user: {
              id: user._id,
              email: user.email,
              first_name : user.first_name,
              last_name : user.last_name,
             
          }
      }
  });
}

// Define the login controller
exports.login = catchAsync(async (req, res, next) => {
  var user = await auth.authenticate(req.body.email, req.body.password)

  
  if (typeof user === "string")
      return next(new AppError(user, 400))
  else if (typeof user === "object")
      sendToken(user, 200, res);
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


 
  sendToken(newUser, 201, res);
});


