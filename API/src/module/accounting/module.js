const AccountingController = require('./controller/accounting_controller')


/**
 *
 * @param {import('Express').Application}app
 * @param {import('rsdi').IDIContainer} container
 */
function initAccountingModule (app,container){


/**
 * @type {AccountingController} controller
 */
    const controller  = container.get('AccountingController')
    controller.configureRoutes(app)
}




module.exports ={
initAccountingModule,
AccountingController

}