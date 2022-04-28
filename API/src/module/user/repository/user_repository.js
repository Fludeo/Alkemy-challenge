module.exports =  class UserRepository {
   

    /**
     * 
     * @param {import('../model/user_model')} userModel
     */
    
        constructor(userModel){
            this.userModel = userModel;
        }
    
            /**
     * 
     * @param {import('../entity/user_entity')} newUser
     */
      
        async addUser(newUser){
            
         const user =  this.userModel.build({
              name:newUser.name,
              email:newUser.email,
              hash:newUser.hash,  
             
         })
         await user.save()
      
         return user
        }
        
        async getByEmail(email){

            const user = await this.userModel.findOne({where:{email:email}})

            return user
        }
        
    
    
    }