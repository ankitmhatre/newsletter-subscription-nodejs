



const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({


    
title :  {
    type: String,

  
},
content : {
    type: String,

},
created_at:  {
    type: String,

}, 
industry:  {
    type: String,

},  
source:  {
    type: String,

}, 
subcategory:  {
    type: String,

}




});


// subscriptions: [ 
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Subscription'
//     }
// ]




// Compare entered password with hashed password

module.exports = mongoose.model('NewsLetter', newsletterSchema);
