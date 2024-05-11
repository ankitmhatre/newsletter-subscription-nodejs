module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
        // we call the next function inside the catch and pass the error into it. 
        // 'next' is same as writing 'err => next(err)'
    }
}