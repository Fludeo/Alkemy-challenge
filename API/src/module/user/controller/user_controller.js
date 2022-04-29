const UserDto =  require('../dto/user_dto');
// eslint-disable-next-line no-unused-vars

const bcrypt = require('bcrypt');
const fromUserDtoToEntity = require('../mapper/fromUserDtoToEntity');
const CredentialsTakenError = require('../error/credentialsTakenError');

module.exports =  class UserController {
   
/**
 * 
 * @param {import('../service/user_service')} userService
 * @param {import('../../auth/module').AuthService} authService  
 */


    constructor(userService,authService){
        this.userService = userService;
        this.authService = authService;
        this.BASE_ROUTE = '/user';
    }
/**
 * 
 * @param {import('Express')} app 
 */

    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.post(`${BASEROUTE}/signup`, this.signUp.bind(this));
        app.get(`${BASEROUTE}/info`,this.authService.authenticateToken,this.info.bind(this));
        app.get(`${BASEROUTE}/:id`,this.authService.authenticateToken, this.getUserById.bind(this));
       
        
      }


/**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

    async getUserById(req,res){
      
        res.sendStatus(200)

      
    }
    /**
 * 
 * @param {import('Express').Request} req 
 * @param {import('Express').Response} res 
 */

     async info(req,res,next){
        try{
           const user = await this.userService.getUserById(req.user.id)
           res.status(200)
           res.json(user.name)
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

    async signUp (req,res,next){
       const userDto = new UserDto(req.body)
     
        try {
            userDto.validate()
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(userDto.password,salt)
            userDto.password = hash
          if(await this.userService.getUserByEmail(userDto.email))
          {
              throw new CredentialsTakenError(`User with email: ${userDto.email} already exists`)
          }
          await this.userService.newUser(fromUserDtoToEntity(userDto))

            res.sendStatus(200);
        }

        catch (err){
           next(err)
        }
        


    }


}