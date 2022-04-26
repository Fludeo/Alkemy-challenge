



module.export =  class DefaultController {
   
    constructor(accountingService){
        this.accountingService = accountingService;
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
        console.log(this)
        res.sendStatus(200)
    }


}