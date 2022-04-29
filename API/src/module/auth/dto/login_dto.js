module.exports = class LoginDto {
    constructor({email,password}){

        /**
         * @type {string} email
         * @type {string} password
         */

        this.email = email
        this.password =password
    }


}