
const RecordDto =  require('../dto/record_dto');
const RecordValidationError = require('../error/record_validation_error');

module.exports =  class RecordController {
   
/**
 * 
 * @param {import('../service/record_service')} recordService
 * @param {import('../../auth/service/auth_service')} authService
 */

    constructor(recordService,authService){
        this.authService = authService
        this.recordService = recordService;
        this.BASE_ROUTE = '/record';
    }

    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.get(`${BASEROUTE}/sort/:by`, this.authService.authenticateToken,this.getRecordById.bind(this));
        app.get(`${BASEROUTE}/filter/:by`, this.authService.authenticateToken,this.getRecordById.bind(this));
        app.get(`${BASEROUTE}/all`, this.authService.authenticateToken,this.getRecordById.bind(this));
        app.get(`${BASEROUTE}/:id`, this.getRecordById.bind(this));
        app.post(`${BASEROUTE}/new`, this.addRecord.bind(this));

      }



/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

    async getRecordById(req,res){
      


        res.sendStatus(200)
    }

    /**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

    async addRecord (req,res,next){
        const recordDto = new RecordDto(req.body)
        
        try {
            if(!recordDto.validate()){
                throw new RecordValidationError('Validation failed...')  
               }
              

            res.sendStatus(200);
        }
        catch (err){
        
           next(err)
        }
        


    }


}