const { UserModel } = require('../../user/module');
const fromRecordModelToEntity = require('../mapper/recordModelToEntity')

module.exports =  class RecordRepository {
   

    /**
     * 
     * @param {import('../model/record_model')} recordModel
     */
    
        constructor(recordModel){
            this.recordModel = recordModel;
        }
    
          /**
     * 
     * @param {import('../model/record_model')} newRecord
     */
    
    
     async addRecord (newRecord,user){

       const record = await this.recordModel.create(newRecord,{isNewRecord:true})
         const userToAdd = await UserModel.findByPk(user.id)
         await record.setUser (userToAdd)

     }

     async getRecordById (recordId){

      const record = await this.recordModel.findByPk(recordId)
    
      return fromRecordModelToEntity(record)
    

    }
    async deleteRecordById (recordId){

      return await this.recordModel.destroy({where:{id:recordId}})
   
      
    

    }
    
    }