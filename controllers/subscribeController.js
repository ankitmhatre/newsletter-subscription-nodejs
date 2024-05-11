const AppError = require('../utils/appError');
const aes = require('../utils/aes256Crypt');
const catchAsync = require('../utils/catchAsync');

const Subscription = require('../models/subscriptionModel');
const Newsletter = require('../models/newsletterModel');





exports.subscribeTo = catchAsync(async (req, res, next) => {


      const newsletterId = req.params.newsletterId;
      const newsletter = await Newsletter.findById(newsletterId);

      if (!newsletter) {
            throw new AppError('Newsletter not found', 404);
      }

      const subscription = await Subscription.create({
            user: req.user._id,
            newsletter  : newsletterId
      });


      const subscription2 = await Subscription.findById(subscription._id)

       .populate('user') // Populate the author field
      .populate('newsletter');






      // Rest of the code...
      return res.json({
            status: "success",
            msg: "Subscribed successfully",
            data: subscription2
      });
 
});


exports.getSubscription = catchAsync(async (req, res, next) => {


      if(!req.user){
            throw new AppError('User not found', 404);
      }
      const subscription = await Subscription.findOne({ user: req.user._id });
      if (!subscription) {
            throw new AppError('Subscription not found', 404);
      }
      res.status(200).json({
            status: 'success',
            data: {
                  subscription,
            },
      });
});


exports.deleteSubscription = catchAsync(async (req, res, next) => {
      // Logic to delete subscription
});