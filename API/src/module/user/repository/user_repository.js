const { AuthModel } = require('../../auth/module');
const fromUserModelToEntity = require('../mapper/fromUserModelToEntity');
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
        async addRefreshToken(user,token){

            const rerfreshUser = await this.userModel.findByPk(user.id)
            const refreshToken = await AuthModel.create({refreshToken:token},{isNewRecord:true})
            await rerfreshUser.addAuth(refreshToken)

          
        }


        async getByEmail(email){
            const user = await this.userModel.findOne({where:{email:email}})
            if(user===null) return null
            return  fromUserModelToEntity(user)
        }


        async getById(id){

            const user = await this.userModel.findByPk(id)

            return fromUserModelToEntity(user)
        }
    
    
    }