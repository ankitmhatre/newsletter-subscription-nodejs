const express = require('express');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const cors = require('cors');
const { loginController , signupController} = require('./controllers/authController');
const authRouter = require('./routes/authRouter');
const newslettersRouter = require('./routes/newslettersRouter');
const subscriptionRouter = require('./routes/subscriptionRoutes');

const AppError = require('./utils/appError');
const GlobalErrorController = require("./controllers/errorController");
const auth = require('./modules/auth/auth');
const tokens = require('./modules/auth/tokens');

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))



app.use('/auth', authRouter);
app.use('/newsletters', newslettersRouter);
app.use('/subscription', auth.authenticateToken,  subscriptionRouter);



app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on this server!`, 404));
})

// when error, 'GlobalErrorController' will be called automatically
app.use(GlobalErrorController);



module.exports  = app;