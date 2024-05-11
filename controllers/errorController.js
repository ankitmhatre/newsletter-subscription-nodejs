const AppError = require('../utils/appError');
const { json } = require('body-parser');


const handleCastError = err => {
    console.log("Error Objecy: Cast Error", err.path);
    const message = `invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDuplicateFields = err => {
    console.log("handleDuplicateFields: ", err)
    //const value = err.errorCode.match(/(["'])(\\?.)*?\1/);
    var value = Object.keys(err.keyPattern);
    console.log("error value: ", value);
    const errorCode = `${value}_exists`;
    return new AppError(errorCode, 400);
}

const handleValidationError = err => {
    var error = "";
    Object.values(err.errors).map(val =>{
        console.log("Error Value kind: ", val.kind);
        if(val.kind === "required")
            error = `required_${val.path}`
        else if( val.kind === 'unique')
            error = `${val.path}_exists`
        else
            error = `invalid_${val.path}`
    });
   return new AppError(error, 400);
}



const sendErrorDev = (res, err) => {
    

    // if (!(err.isOperational)) {
    res.status(err.statusCode).json({
        status: err.status,
        errorCode: err.errorCode,
        err: err,
        stack: err.stack
    });
    // }
    // else {
    //     res.status(err.statusCode).json({
    //         status: err.status,
    //         errorCode: err.errorCode,
    //         err: err,
    //         stack: err.stack
    //     });
    // }
}

const sendErrorProd = (res, err) => {

    res.status(err.statusCode).json({
        status: err.status,
        errorCode: err.errorCode
    });
    // programming or other unknow errors: don't leak error details to client
    
}

module.exports = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if (process.env.NODE_ENV === 'development') {
        
        let error = err;
        error.errorCode = err.message;

        if (error.name === 'CastError')
            error = handleCastError(error);

        if (error.code === 11000)
            error = handleDuplicateFields(error);

        if (err.name === 'ValidationError') {
            console.log("Validation Error");
            error = handleValidationError(error);
        }

        sendErrorDev(res, error);
    }

    else if (process.env.NODE_ENV === 'production') {

        let error = err;
        error.errorCode = err.message;

        if (error.name === 'CastError')
            error = handleCastError(error);
/*
        if (error.code === 11000)
            error = handleDuplicateFields(error);
*/
        if (err.name === 'ValidationError') {
            error = handleValidationError(error);
        }

  
        sendErrorProd(res, error);
    }
}