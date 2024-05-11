const nodemailer = require('nodemailer');
const mail = require('@sendgrid/mail');


const sendMail = async (msg) => {

    
    let mAuth = {
        user: environment.EMAIL_ID, // generated ethereal user
        pass: environment.EMAIL_PASS, // generated ethereal password
    };

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.in',
        port: 465,
        secure: true, //ssl
        auth: mAuth,
    });


    transporter.sendMail(msg, function (err, data) {
        if (err) {
            console.log("Error while sending mail to the user: " + err);
            return err;
        }
        else {
            console.log("Mail has been sent to the user successfully");
            return true;
        }
    });
}





exports.sendVariableMail = (type, mailObj) => {
    //check the type of mail
    switch (type) {
        case 1:
            return sendWelcomeMail(mailObj.email);
      
            case 2:
                return sendNewsLetter(mailObj.email);
        default:
            console.log("Not a valid type");
            return false
    }
}

const sendWelcomeMail = (email) => {
    console.log("Creating Welcome Mail Templatw");
    const msg = welcomeEmail(email)
    sendMail(msg);
}

const sendNewsLetter = (email) => {
    console.log("Creating Welcome Mail Templatw");
    const msg = welcomeEmail(email)
    sendMail(msg);
}

