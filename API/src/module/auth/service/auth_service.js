require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const IncorrectPasswordError = require('../error/incorrectPasswordError');
const InvalidRefreshTokenError = require('../error/invalidRefreshToken');
const InvalidTokenError = require('../error/invalidTokenError');
module.exports =  class AuthService {
   

    /**
     * 
     * @param {import('../../user/module').UserService} userService
     * @param {import('../repository/auth_repository')} authRepository
     */
    
        constructor(userService,authRepository){
            this.userService = userService;
            this.authRepository = authRepository
        }
/**
     * 
     * @param {import('../../user/entity/user_entity')} user 
     * @param {import('express').Response} res
     */
        
        async login(user,res){

            const checkUser = await this.userService.getUserByEmail(user.email) 
            if(!(await bcrypt.compare(user.password,checkUser.hash))){
            throw new IncorrectPasswordError('Incorrect password...')
             }

           const accessToken =  await this.giveAccessToken(checkUser,res)
           return accessToken


        }

/**
     * 
     * @param {import('express').Response} res
     */


async logout (refreshToken){

       
        await this.authRepository.removeRefreshToken(refreshToken)
      
}


    /**
     * 
     * @param {import('../../user/entity/user_entity')} user 
     * @param {import('express').Response} res
     */
      
        async giveAccessToken (user , res){
       
          const accessToken = generateAccessToken(user) 
          const refreshToken = generateRefreshToken(user)

          await setCookies(res,refreshToken)
      
          await this.userService.saveRefreshToken(user,refreshToken)
          
         
          return {accessToken:accessToken}
        }
          
     /**
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
       async authenticateToken(req,res,next){
 
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
    
            if(token===null) {throw new InvalidTokenError('Invalid token!!!')}
          
             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err,user)=>{

                if(err){
                    throw new InvalidTokenError(`Error token ${err}`)
                }
          
                req.user = user
                next()
               
            })
            
          }
    
          async refreshToken (refreshToken,res){

            await this.authRepository.removeRefreshToken(refreshToken)
    
            let userToRefresh

           jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,  (err,user)=>{

                if(err){ throw new InvalidRefreshTokenError('Expired token!!!')}
          
                 userToRefresh = user
               
            })
            
            const user = await this.userService.getUserByEmail(userToRefresh.email) 
           const accessToken = await this.giveAccessToken(user,res)
  
           return accessToken

          }






    }


    function generateAccessToken (user){
        const accesToken = jwt.sign({id:user.id,email:user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60*15})   
        return accesToken   
    }
    function generateRefreshToken (user){
        const accesToken = jwt.sign({id:user.id,email:user.email}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: 60*60*24*7})   
        return accesToken   
    }


    /**
     * 
     * @param {import('express').Response} res 
     * @param {String} refreshToken
     */

   async function setCookies (res,refreshToken){
        res.cookie('alk1', refreshToken,{
        httpOnly:true,
        secure: true,
        path:"/auth/session",
        expiresIn: '7d',
    })


    }