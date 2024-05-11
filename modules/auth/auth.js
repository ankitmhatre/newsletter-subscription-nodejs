

const User = require("../../models/userModel");
const Email = require('../../utils/emailHandler');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: async function(email, password){
        if(!email)
            return "required_email"
        if(!password)
            return "required_password"
        var user = await User.findOne({email}).select('+password');
        if(!user)
            return "user_not_exist"
        if(!(await user.correctPassword(password, user.password)))
            return "incorrect_password"
        if(user.disabled)
            return 'user_disabled'
        return user
    },

  
}