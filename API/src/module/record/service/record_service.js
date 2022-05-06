const Record = require('../entity/record_entity');
const RecordNotDefinedError = require('../error/record_not_defined_error');
const RecordDoesNotExistError = require ('../error/record_does_not_exist_error')

module.exports =  class RecordService   {

/**
 * 
 * @param {import('../repository/record_repository')} recordRepository 
 */

    constructor(recordRepository){
        this.recordRepository = recordRepository;
    }

  async  addRecord(record,user){

    if(!(record instanceof Record)){
        throw new RecordNotDefinedError('object is not defined as instance of Record')
    }
    
     await this.recordRepository.addRecord(record,user)
    
  }

  async getRecordById (recordId) {
   return await  this.recordRepository.getRecordById(recordId)
  }


  async deleteRecordById (recordId,user) {
    const recordToDelete = await this.getRecordById(recordId)
    if (recordToDelete.userId === user.id){
      this.recordRepository.deleteRecordById(recordId)
    }
    else{
      throw new RecordDoesNotExistError ('Record does not exist in this user')
    }
  }

  async getBalance(user){
    const allRecords = await this.recordRepository.getAll(user)

    const balance = allRecords.reduce(balanceReducer)

    return await balance.amount
  }

}

const balanceReducer =(prev,current)=>{
  const result =  current.type==='income'? prev.amount+current.amount : prev.amount-current.amount

  return {amount:result}

}