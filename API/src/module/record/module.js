const RecordController = require('./controller/record_controller')
const RecordService = require('./service/record_service')
const RecordRepository = require('./repository/record_repository')
const RecordModel = require('./model/record_model')
/**
 *
 * @param {import('Express').Application}app
 * @param {import('rsdi').IDIContainer} container
 */
function initRecordModule (app,container){


/**
 * @type {RecordController} controller
 */
    const controller  = container.get('RecordController')
    controller.configureRoutes(app)
}




module.exports ={
initRecordModule,
RecordController,
RecordService,
RecordRepository,
RecordModel,

}