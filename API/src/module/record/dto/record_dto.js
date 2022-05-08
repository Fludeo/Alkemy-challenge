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


constructor ({id,concept,amount,type,category,date}){
this.id = id
this.concept = concept
this.amount = amount
this.type = type
this.category = category
this.date = date
}



validate(){
    console.log(this.concept)
    if(this.concept===undefined||this.concept===''||
        this.amount===undefined||this.amount===''||
        this.type===undefined||this.type===''||
        this.category===undefined||this.category===''||
        this.date===undefined||this.date===''){

        throw new RecordValidationError('No blank fields')
    }
}

}