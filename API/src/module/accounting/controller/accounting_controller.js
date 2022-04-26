module.export =  class AccountingController {
   
    constructor(accountingService){
        this.accountingService = accountingService;
        this.BASE_ROUTE = '/accounting';
    }

    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.get(`${BASEROUTE}/records`, this.getRecords.bind(this));

      }



/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

    async getRecords(req,res){
      


        res.sendStatus(200)
    }


}