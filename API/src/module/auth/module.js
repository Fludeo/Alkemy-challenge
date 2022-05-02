const AuthController = require('./controller/auth_controller')
const AuthModel = require('./model/auth_model')
const AuthRepository = require('./repository/auth_repository')
const AuthService = require('./service/auth_service')

/**
 *
 * @param {import('Express').Application}app
 * @param {import('rsdi').IDIContainer} container
 */
function initAuthModule (app,container){


/**
 * @type {AuthController} controller
 */
    const controller  = container.get('AuthController')
    controller.configureRoutes(app)
}




module.exports ={
initAuthModule,
AuthController,
AuthService,
AuthRepository,
AuthModel,
}