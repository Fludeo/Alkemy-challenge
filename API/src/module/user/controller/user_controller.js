const UserDto =  require('../dto/user_dto');
// eslint-disable-next-line no-unused-vars
const ValidationError = require('../error/validation_error');
const bcrypt = require('bcrypt');
const fromUserDtoToEntity = require('../mapper/fromUserDtoToEntity');

module.exports =  class UserController {
   
/**
 * 
 * @param {import('../service/user_service')} userService 
 */


    constructor(userService){
        this.userService = userService;
        this.BASE_ROUTE = '/user';
    }

    configureRoutes(app) {
        const BASEROUTE = this.BASE_ROUTE;
        app.get(`${BASEROUTE}/:id`, this.getUserById.bind(this));
        app.post(`${BASEROUTE}/signup`, this.signUp.bind(this));
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

    async signUp (req,res,next){
       const userDto = new UserDto(req.body)
       const salt = await bcrypt.genSalt()
       const hash = await bcrypt.hash(userDto.password,salt)
       userDto.password = hash
        try {
         
          await this.userService.newUser(fromUserDtoToEntity(userDto))

            res.sendStatus(200);
        }
        catch (err){
        
           next(err)
        }
        


    }


}