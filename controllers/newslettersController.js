const AppError = require('../utils/appError');
const aes = require('../utils/aes256Crypt');
const catchAsync = require('../utils/catchAsync');
const tokens = require('../modules/auth/tokens');
const NewEmail = require('../utils/emailHandler');
const NewsLetter = require('../models/newsletterModel');







// Define the login controller
exports.createOne = catchAsync(async (req, res, next) => {

   var newletterResponse = await NewsLetter.create(req.body)

if(!newletterResponse){
      return next(new AppError("error_creating_newsletter"));
      
}
      return res.json({
        "status" :  "success",
        "msg":"Successfully added", 
        "data": newletterResponse
      })

})




exports.getAll = catchAsync(async (req, res, next) => {

const newsletters = await NewsLetter.find();

if (newsletters.length < 1) {
      return res.json({
            status: "success",
            count: 0,
            msg: "No records found",
            data: []
      });
}
return res.json({
      status: "success",
      count: newsletters.length,
      msg: "Fetched succesffully",
      data: newsletters
});
});

exports.deleteOne = catchAsync(async (req, res, next) => {
      const newsletter = await NewsLetter.findByIdAndDelete(req.params.id);
      if (!newsletter) {
            return next(new AppError("Newsletter not found", 404));
      }
      return res.json({
            status: "success" ,
            msg: "Newsletter deleted successfully",
            data: newsletter
      });
});


