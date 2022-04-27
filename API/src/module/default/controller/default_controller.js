



module.exports =  class DefaultController {
   /**
    * 
    * @param {import('../../record/service/record_service')} recordService 
    */


    constructor(recordService){
        this.recordService = recordService;
        this.BASE_ROUTE = '/';
    }

    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.get(`${BASEROUTE}home`, this.home.bind(this));

      }



/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

    async home(req,res){
        
        res.sendStatus(200)
    }


}