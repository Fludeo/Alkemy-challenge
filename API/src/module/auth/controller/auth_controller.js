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
        app.post(`${BASEROUTE}/login`, this.login.bind(this));
        app.post(`${BASEROUTE}/session`, this.session.bind(this));
      }
 


/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

 async login(req,res,next){
        
    const loginDto = new LoginDto(req.body)
    
try{
loginDto.validate()
const token = await this.authService.login(loginDto,res)
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

 async logout(req,res,next){
  
 
try{
  const cookie = req.headers['cookie']
  res.clearCookie('alk1',{httpOnly:true,secure:true,path:'/auth/session'})
  
 
  const httpOnlyToken = cookie && cookie.split('=')[1]
  if(httpOnlyToken === undefined){
    throw new InvalidRefreshTokenError('No refresh token')
  }

await this.authService.logout(httpOnlyToken)

res.status(200)
res.send()

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


async session (req,res,next){

    if(req.body.logout){return this.logout(req,res,next) }
    
   try{
    const cookie = req.headers['cookie']
    const httpOnlyToken = cookie && cookie.split('=')[1]
    console.log(httpOnlyToken)
    if(httpOnlyToken===null){
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