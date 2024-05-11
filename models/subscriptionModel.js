const mongoose = require('mongoose');
const userModel = require('./userModel');
const NewsLetter = require('./newsletterModel');
const User = require('./userModel');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    newsletter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: NewsLetter
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
