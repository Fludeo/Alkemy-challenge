/* eslint-disable no-useless-escape */

const ValidationError = require("../error/validationError")


module.exports = class UserDto {

/**
 * 
 * @param {String} email 
 * @param {String} name
 * @param {String} password
 */


constructor ({email,name,password}){
this.email = email
this.name = name
this.password = password
}
validate(){

    if(this.email===undefined||this.name===undefined||this.password===undefined){
        throw new ValidationError ('There is an empty field...')
    
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email))){
        throw new ValidationError ('Invalid email!!!')
    }
    if(!(/^[a-zA-Z ]{2,30}$/.test(this.name))){
        throw new ValidationError ('Invalid Name: 2-30 characters excluding numbers and symbols')
    }
    if(!(/^[A-Za-z]\w{7,14}$/.test(this.password))){
        throw new ValidationError ('Invalid Password: 8-16 characters including numbers and starting with a letter')
    }

}

}
