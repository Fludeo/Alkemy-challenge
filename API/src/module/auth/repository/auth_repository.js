module.exports =  class AuthRepository {
   

    /**
     * 
     * @param {import('../module').AuthModel} authModel
     */
    
        constructor(authModel){
            this.authModel = authModel;
        }
        

      async  saveRefreshToken (token){

      const savedToken = await this.authModel.build({refreshToken:token})

      await savedToken.save()

      return savedToken
      }
      
      async removeRefreshToken (token){
       
       const deleted = await this.authModel.destroy({where:{refreshToken: token}})
       
   console.log(deleted)
      
    
    }
  }