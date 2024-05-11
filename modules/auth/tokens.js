const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/userModel');


module.exports = {

    createAccessToken: function(value){
     
        payload = {
            scope: "access",
            data: {
                id: value._id,
               
               
                
            }
        }
        options = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
            audience: '',
            issuer: '',
        }
        var token = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, options);
        return token
    },

    createRefreshToken: function(value){
        payload = {
            scope: "refresh",
            data: value
        }
        options = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
            audience: '',
            issuer: '',
        }
        var token = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, options)
        return token
    },

    createEmailToken: function(value){
        payload = {
            scope: 'email',
            data: value
        }
        options = {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EMAIL_EXPIRES_IN,
            audience: '',
            issuer: '',
        }
        var token = jwt.sign(payload, `${process.env.JWT_EMAIL_SECRET}`, options)
        return token
    },

    verifyAccessToken: async function(accessToken){
        options = {
            algorithm: 'HS256',
            audience: '',
            issuer: '',
        }
        try{    
            var decoded = jwt.verify(accessToken, `${process.env.JWT_ACCESS_SECRET}`, options);
            return decoded.scope === "access" ? decoded : 'invalid_scope';
        }catch(err){
            if (err.name == "TokenExpiredError")
                return "expired_access_token"
            if (err.name == "JsonWebTokenError")
                return "invalid_access_token"
        }
    },
    
    verifyRefreshToken: async function(refreshToken){
        options = {
            algorithm: 'HS256',
            audience: '',
            issuer: '',
        }
        try{
            var decoded = jwt.verify(refreshToken, `${process.env.JWT_REFRESH_SECRET}`, options);
            return decoded.scope === "refresh" ? decoded : 'invalid_scope';
        }catch(err){
            if (err.name == "TokenExpiredError")
                return "expired_refresh_token"
            if (err.name == "JsonWebTokenError")
                return "invalid_refresh_token"
        }
    },

    verifyEmailToken: async function(token){
        options = {
            algorithm: 'HS256',
            audience: '',
            issuer: '',
        }
        try{
            var decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET, options);
            return decoded.scope === "email" ? decoded : 'invalid_scope';
        }catch(err){
            if (err.name == "TokenExpiredError")
                return "expired_email_token"
            if (err.name == "JsonWebTokenError")
                return "invalid_email_token"
        }
    },

}