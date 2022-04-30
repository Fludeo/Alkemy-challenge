/* eslint-disable no-useless-escape */
const ValidationError = require("../../user/error/validationError")

module.exports = class LoginDto {
    constructor({email,password}){

        /**
         * @type {string} email
         * @type {string} password
         */

        this.email = email
        this.password =password
    }
    validate(){

        if(this.email===undefined||this.password===undefined){
            throw new ValidationError ('There is an empty field...')
        
        }
        console.log(this)
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email))){
            throw new ValidationError ('Invalid email!!!')
        }
   
    }
     
}