const jwt = require('jsonwebtoken');
const IncorrectPasswordError = require('../error/incorrectPasswordError');
const bcrypt = require('bcrypt');
require("dotenv").config()
module.exports =  class AuthService {
   

    /**
     * 
     * @param {import('../../user/module').UserService} userService
     */
    
        constructor(userService){
            this.userService = userService;
        }

        
    /**
     * 
     * @param {import('../../user/entity/user_entity')} user 
     *
     */
      
        async login (user){
            const checkUser = await this.userService.getUserByEmail(user.email) 
            if(!(await bcrypt.compare(user.password,checkUser.hash))){
            throw new IncorrectPasswordError('Incorrect password...')
             }

          const accesToken = generateAccesToken(checkUser) 
          const refreshToken = generateRefreshToken(checkUser)
          return {accesToken:accesToken,refreshToken:refreshToken}
        }
    
        authenticateToken(req,res,next){
 
            const authHeader = req.headers['authorization']
            
            const token = authHeader && authHeader.split(' ')[1]
          
            if(token===null) return res.sendStatus(401)
          
             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err,user)=>{

                if(err){return res.sendStatus(403)}
          
                req.user = user
                next()
               
            })
            
          }
    
    
    }
    function generateAccesToken (user){
        const accesToken = jwt.sign({id:user.id,email:user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60*15})   
return accesToken   
    }
    function generateRefreshToken (user){
        const accesToken = jwt.sign({id:user.id,email:user.email}, process.env.REFRESH_TOKEN_SECRET)   
return accesToken   
    }
