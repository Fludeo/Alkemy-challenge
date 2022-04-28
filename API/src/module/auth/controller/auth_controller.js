const LoginDto = require('../dto/login_dto');
const bcrypt = require('bcrypt');
const IncorrectPasswordError = require('../error/incorrectPasswordError');
module.exports = class AuthController {

/**
 * 
 * @param {import('../service/auth_service')} authService 
 * @param {import('../../user/module').UserService} userService 
 */
    constructor(authService,userService){
this.authService = authService
this.userService = userService
this.BASE_ROUTE = '/auth'
    }
    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.post(`${BASEROUTE}/login`, this.login.bind(this));
        app.post(`${BASEROUTE}/token`, this.token.bind(this));
        
      }
 
/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */



async login (req,res,next){

  const loginDto = new LoginDto(req.body)
  try{
    const user = await this.userService.getByEmail(loginDto.email) 
    if(!(await bcrypt.compare(loginDto.password,user.hash))){
    throw new IncorrectPasswordError('Incorrect password...')
   }

   const accesToken = await this.authService.login(user)
   res.status(200)
   res.json({accesToken:accesToken})
   
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


}
}