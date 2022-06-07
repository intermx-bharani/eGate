const successHandler = (req, res, result = {}) => {
    let resultData = {isSuccess: true, message: '', data: {}, ...result }
    res.send(resultData);
}

const errorHandler = (req, res, error = {}, errorCode = 500) => {
    let resultData = {isSuccess: false, message: error.message || '', data: {}, error }
    res.status(errorCode).send(resultData);
}


module.exports = {
    errorHandler,
    successHandler
}