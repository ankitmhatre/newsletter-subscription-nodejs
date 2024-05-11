

const User = require("../../models/userModel");
const Email = require('../../utils/emailHandler');
const jwt = require('jsonwebtoken');
const aes = require('../../utils/aes256Crypt');
const catchAsync = require('../../utils/catchAsync');
const tokens = require('../auth/tokens');

module.exports = {
    authenticate: async function (email, password) {
        if (!email)
            return "required_email"
        if (!password)
            return "required_password"
        var user = await User.findOne({ email }).select('+password');
        if (!user)
            return "user_not_exist"
        if (!(await user.correctPassword(password, user.password)))
            return "incorrect_password"
        if (user.disabled)
            return 'user_disabled'
        return user
    },
    authenticateToken: async (req, res, next) => {


    

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];


        if (token == null) {
            return res.json({
                error: "Unauthorized",
                "msg" : "Pass token"
            }); // Unauthorized
        }



        var access_token = aes.decrypt(decodeURIComponent(token), `${process.env.TOKEN_SECRET_KEY}`);
    if(!access_token){
        return res.json({
            error: "Unauthorized",
            "msg" : "Invalid token"
    })
}


        try {
            const user = await jwt.verify(access_token, process.env.JWT_ACCESS_SECRET);

           
            const foundUser = await User.findById(user.data.id, {

                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            
            });
            if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
            }
            req.user = foundUser;
            next();
        } catch (err) {
            return res.json({
            error: "Forbidden",
            "msg" : "Invalid token",
            "err" : err
            });
        }
    },
     sendToken :  (user, statusCode, res) => {

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
                
                }
            }
        });
      }

}