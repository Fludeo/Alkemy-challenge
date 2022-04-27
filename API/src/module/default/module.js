
const  DefaultController = require('./controller/default_controller.js')



/**
 *
 * @param {import('Express').Application} app 
 * @param {import('rsdi').IDIContainer} container 
 */
function InitDefaultModule(app,container){

    /**
     * @type {DefaultController} controller
     */
   const controller = container.get('DefaultController')

   controller.configureRoutes(app)

}






module.exports = {
    InitDefaultModule,
    DefaultController
}