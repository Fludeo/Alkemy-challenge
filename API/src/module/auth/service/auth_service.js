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
     * @param {import('express').Request} req
     */
        
        async login(user,req,res){

            const checkUser = await this.userService.getUserByEmail(user.email) 
            if(!(await bcrypt.compare(user.password,checkUser.hash))){
            throw new IncorrectPasswordError('Incorrect password...')
             }
           return await this.giveAccessToken(checkUser,res)


        }
    /**
     * 
     * @param {import('../../user/entity/user_entity')} user 
     * @param {import('express').Response} res
     */
      
        async giveAccessToken (user , res){
            
      

          const accessToken = generateAccessToken(user) 
          const refreshToken = generateRefreshToken(user)

          res.cookie('alkemy', refreshToken,{
              httpOnly:true,
              secure: true,
              path: '/auth/token',
              expiresIn: '7d',
          })

          await this.userService.saveRefreshToken(user,refreshToken)
          
          return {accessToken:accessToken}
        }
          
     /**
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
        authenticateToken(req,res,next){
 
            const authHeader = req.headers['authorization']
            
            const token = authHeader && authHeader.split(' ')[1]
          
            if(token===null) {throw new InvalidTokenError('Invalid token!!!')}
          
             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err,user)=>{

                if(err){return res.sendStatus(403)}
          
                req.user = user
                next()
               
            })
            
          }
    
          async refreshToken (refreshToken,res){

              await this.authRepository.removeRefreshToken(refreshToken)
    
              let userToRefresh
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,  (err,user)=>{

                if(err){ throw new InvalidRefreshTokenError('Invalid token!!!')}
          
                 userToRefresh = user
               
            })

            const user = await this.userService.getUserByEmail(userToRefresh.email) 

            return await this.giveAccessToken(user,res)
           

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
