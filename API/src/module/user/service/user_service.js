const User = require('../entity/user_entity');
const UserNotDefined = require('../error/userNotDefinedError');
const UserNotFound = require('../error/userNotFound');
const CredentialsTakenError = require('../error/credentialsTakenError');
module.exports =  class UserService {
   

/**
 * 
 * @param {import('../repository/user_repository')} userRepository 
 */

    constructor(userRepository){
        this.userRepository = userRepository;
    }

   async newUser(newUser) {

    if(!(newUser instanceof User)){
        throw new UserNotDefined('User not defined!!!')
    }    
    if(await this.userRepository.getByEmail(newUser.email))
    {
        throw new CredentialsTakenError(`User with email: ${newUser.email} already exists`)
    }
    return this.userRepository.addUser(newUser)

   }
   

   async getUserByEmail(email){
    
    const user = await this.userRepository.getByEmail(email)
    
    if(user===null){
        throw new UserNotFound ('User not found!!!')
    }
    return user
   }


  
    async getUserById(id){
        const user = await this.userRepository.getById(id)
        if(user===null){
            throw new UserNotFound ('User not found!!!')
        }
    
        return user
    

    }

    async saveRefreshToken(user,token){

        await this.userRepository.addRefreshToken(user,token)
    }

    async addRecord(record,user){
        console.log(record)
        
        return await this.userRepository.addRecord(record,user)
    }
}