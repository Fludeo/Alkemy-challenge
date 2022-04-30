const LoginDto = require('../dto/login_dto');



module.exports = class AuthController {

/**
 * 
 * @param {import('../service/auth_service')} authService 
 */
    constructor(authService){
this.authService = authService

this.BASE_ROUTE = '/auth'
    }
    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.post(`${BASEROUTE}/token`,this.authService.authenticateToken, this.token.bind(this));
        app.post(`${BASEROUTE}/login`, this.login.bind(this));
      }
 
/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

 async login(req,res,next){
        
    const loginDto = new LoginDto(req.body)
    
try{
loginDto.validate()
const tokens = await this.authService.login(loginDto)
res.status(200)
res.json(tokens)

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
async token (req,res){
    console.log(req)
    console.log(res)

}
}