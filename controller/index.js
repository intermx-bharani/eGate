module.exports.controller = {
    ...require('./userController'),
    ...require('./ authController'),
    ...require('./visitorController'),
    ...require('./vehicleController'),
    ...require('./statusController'),
    ...require('./productController')
}
