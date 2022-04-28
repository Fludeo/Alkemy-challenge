const jwt = require('jsonwebtoken');
require("dotenv").config()
module.exports =  class AuthService {
   

    /**
     * 
     * @param {import('../../user/module').UserService} userService
     */
    
        constructor(userService){
            this.userRepository = userService;
        }
    /**
     * 
     * @param {import('../../user/entity/user_entity')} user 
     * @returns 
     */
      
        async login (user){
          const accesToken = generateAccesToken(user) 
          const refreshToken = generateRefreshToken(user)
            return {accesToken:accesToken,refreshToken:refreshToken}
        }
    

    
    
    }
    function generateAccesToken (user){
        const accesToken = jwt.sign({id:user.id,email:user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15min'})   
return accesToken   
    }
    function generateRefreshToken (user){
        const accesToken = jwt.sign({id:user.id,email:user.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'15min'})   
return accesToken   
    }
