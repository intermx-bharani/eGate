module.exports.controller = {
    ...require('./userController'),
    ...require('./ authController'),
    ...require('./visitorController'),
    ...require('./vehicleController')
}
