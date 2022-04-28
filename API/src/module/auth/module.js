const AuthController = require('./controller/auth_controller')
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

}