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
  async deleteRecord(recordId){
    return await this.recordRepository.deleteRecord(recordId)
  }


  async updateRecord(record){
    if(!(record instanceof Record)){
      throw new RecordNotDefinedError('object is not defined as instance of Record')
  }
    return await this.recordRepository.updateRecord(record)
  }


  async  getRecords(query){
  
   return await this.recordRepository.getRecords(query)
    
  }

  async getRecordById (recordId) {
   return await  this.recordRepository.getRecordById(recordId)
  }


  async deleteRecordById (recordId,user) {
    const recordToDelete = await this.recordRepository.getRecordById(recordId)
    if (await recordToDelete.userId !== user.id){
      throw new RecordDoesNotExistError ('Record does not exist in this user')
  
    }
    await  this.recordRepository.deleteRecordById(recordId)
  }

  async getBalance(user){

    const allRecords = await this.recordRepository.getAll(user)

    const balance = allRecords.reduce(balanceReducer,{amount:0})


    return await balance.amount
  }

}




const balanceReducer =(prev,current)=>{

  let result=prev.amount;

  current.type=="income"? result+=current.amount : result-=current.amount

  return {amount:result}

}