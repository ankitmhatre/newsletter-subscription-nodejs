const express = require('express');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const cors = require('cors');
const { loginController , signupController} = require('./controllers/authController');
const authRouter = require('./routes/authRouter');
const newslettersRouter = require('./routes/newslettersRouter');
const AppError = require('./utils/appError');
const GlobalErrorController = require("./controllers/errorController")

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
    max: 1000,
    windowMs: 30 * 60 * 1000,
    message: 'Too many requests, try again later.'
});


app.use('/auth', authRouter);
app.use('/newsletters', newslettersRouter);
// body parser i.e. reads data from the body into req.body
app.use(express.json({ limit: '100kb' }));



app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on this server!`, 404));
})

// when error, 'GlobalErrorController' will be called automatically
app.use(GlobalErrorController);



module.exports  = app;