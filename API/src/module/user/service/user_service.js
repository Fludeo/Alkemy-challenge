const User = require('../entity/user_entity');
const UserNotDefined = require('../error/userNotDefinedError');
const UserNotFound = require('../error/userNotFound');
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



}