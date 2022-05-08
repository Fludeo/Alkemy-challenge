
const RecordDto =  require('../dto/record_dto');

const fromRecordDtoToEntity = require('../mapper/recordDtoToEntity')

module.exports =  class RecordController {
   
/**
 * 
 * @param {import('../service/record_service')} recordService
 * @param {import('../../auth/service/auth_service')} authService
 */

    constructor(recordService,authService){
        this.authService = authService;
        this.recordService = recordService;
        this.BASE_ROUTE = '/record';
    }
/**
 * 
 * @param {import('express').Application} app
 */
    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.get(`${BASEROUTE}/balance` , this.authService.authenticateToken , this.getBalance.bind(this));
        app.get(`${BASEROUTE}/get/:quantity?/type/:type?/category/:category?`, this.authService.authenticateToken,this.getRecords.bind(this));
        app.delete(`${BASEROUTE}/delete/:id`,this.authService.authenticateToken, this.deleteRecordById.bind(this));
        app.post(`${BASEROUTE}/new`,this.authService.authenticateToken, this.addRecord.bind(this));
        app.put(`${BASEROUTE}/update`,this.authService.authenticateToken, this.updateRecord.bind(this));
      }





    /**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

     async updateRecord(req,res,next){
        const recordDto = new RecordDto(req.body)

        try {
            recordDto.validate()
           await this.recordService.updateRecord(fromRecordDtoToEntity(recordDto))
            res.sendStatus(200)
        } catch (err) {
            next(err)
        }


       
    }


    /**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

     async getRecords(req,res,next){


           let filters ={where:{}};
            req.params.quantity&&(filters.limit=req.params.quantity)
            req.user.id!==undefined&&(filters.where.user_id=req.user.id)
            req.params.type!==undefined&&(filters.where.type=req.params.type)
            req.params.category!==undefined&&(filters.where.category=req.params.category)


        try{
            const records = await this.recordService.getRecords(filters)
            
         res.status(200)
         res.json({records:records})
        }
        catch(err){
            next(err)
        }
    }


/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

     async getBalance(req,res,next){
        try{
            const  user = await req.user
            const balance = await this.recordService.getBalance(user)
            res.status(200);
            res.json({balance:balance})
        }
        catch(err){
            next(err)
        }

       
    }


    /**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

    async addRecord (req,res,next){
        const recordDto = new RecordDto(req.body)
        const user = req.user
        try {
            recordDto.validate()
               
         
            const record = fromRecordDtoToEntity(recordDto)
            await this.recordService.addRecord(record,user)
            
        res.sendStatus(200);
        }
        catch (err){
        
           next(err)
        }
    }

    /**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */


    async deleteRecordById (req,res,next){
      const recordId =  req.params.id
      const user = req.user;
        try{
            await this.recordService.deleteRecordById(recordId,user)
            res.sendStatus(200)
        }
        catch (err){
            next(err)
         }
    }
}