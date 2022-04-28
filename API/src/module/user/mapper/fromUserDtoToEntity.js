const User = require('../entity/user_entity')

/**
 * 
 * @param {import('../dto/user_dto')} userDto 
 */

module.exports = function FromUserDtoToEntity({name,email,password}){

    const user = new User(undefined,name,email,password)

    return user
}