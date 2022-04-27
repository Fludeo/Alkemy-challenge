

module.exports = class UserDto {

/**
 * 
 * @param {Number} id 
 * @param {String} email 
 * @param {String} password 

 */


constructor ({id,email,password}){
this.id = id
this.email = email
this.password = password

}


validate (){

return true
}
}