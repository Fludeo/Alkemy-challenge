const UserController = require('./controller/user_controller')
const UserService = require('./service/user_service')
const UserRepository = require('./repository/user_repository')
const UserModel = require('./model/user_model')
/**
 *
 * @param {import('Express').Application}app
 * @param {import('rsdi').IDIContainer} container
 */
function initUserModule (app,container){


/**
 * @type {UserController} controller
 */
    const controller  = container.get('UserController')
    controller.configureRoutes(app)
}




module.exports ={
initUserModule,
UserController,
UserService,
UserRepository,
UserModel,

}