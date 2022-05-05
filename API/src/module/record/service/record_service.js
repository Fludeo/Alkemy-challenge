const Record = require('../entity/record_entity');
const RecordNotDefinedError = require('../error/record_not_defined_error');
const RecordDoesNotExistError = require ('../error/record_does_not_exist_error')

module.exports =  class RecordService   {

/**
 * 
 * @param {import('../repository/record_repository')} recordRepository 
 * @param {import('../../user/service/user_service')} userService
 */

    constructor(recordRepository,userService){
        this.recordRepository = recordRepository;
        this.userService = userService;
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



}