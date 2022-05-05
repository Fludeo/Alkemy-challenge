const RecordValidationError = require("../error/record_validation_error")


module.exports = class RecordDto {

/**
 * 
 * @param {Number} id 
 * @param {String} concept 
 * @param {Number} amount
 * @param {String} type 
 * @param {String} category 
 * @param {Date} date 
 */


constructor ({concept,amount,type,category,date}){
this.concept = concept
this.amount = amount
this.type = type
this.category = category
this.date = date
}



validate(){

    if(this.concept===undefined||
        this.amount===undefined||
        this.type===undefined||
        this.category===undefined||
        this.date===undefined){

        throw new RecordValidationError('No blank fields')
    }
}

}