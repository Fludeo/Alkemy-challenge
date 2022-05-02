const LoginDto = require('../dto/login_dto');
const InvalidRefreshTokenError = require('../error/invalidRefreshToken');


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
        app.post(`${BASEROUTE}/token`, this.refreshToken.bind(this));
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
const token = await this.authService.login(loginDto,req,res)
res.status(200)
res.json(token)

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


async refreshToken (req,res,next){

  const cookie = req.headers['cookie']
            
  const httpOnlyToken = cookie && cookie.split('=')[1]

 
   try{
    if(!httpOnlyToken){
      throw new InvalidRefreshTokenError('No refresh token')
    }
    const newAccesToken = await this.authService.refreshToken(httpOnlyToken,res)
    
    res.status(200)
    res.json(newAccesToken)
    
    }
    catch(err){
      next(err)
    }

}
}