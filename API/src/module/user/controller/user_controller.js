const RecordDto =  require('../dto/RecordDto');
const ValidationError = require('../error/validation_error');

module.exports =  class RecordController {
   
    constructor(recordService){
        this.recordService = recordService;
        this.BASE_ROUTE = '/record';
    }

    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
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
                throw new ValidationError('Validation failed...')  
               }
              

            res.sendStatus(200);
        }
        catch (err){
        
           next(err)
        }
        


    }


}