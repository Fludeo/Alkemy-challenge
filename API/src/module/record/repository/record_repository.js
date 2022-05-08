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

     async deleteRecord(recordId){
      await this.recordModel.destroy({where:{recordId}})
     
    }

     async updateRecord(record){
       await this.recordModel.update(record,{where:{id:record.id}})
    
    }

     async getRecords (query){
      query.order = [
        ['createdAt', 'DESC']
      ]
     
      const records = await this.recordModel.findAll(query)
    
      return await records


    }


     async getRecordById (recordId){

      const record = await this.recordModel.findByPk(recordId)
      return fromRecordModelToEntity(record)
    

    }
    async deleteRecordById (recordId){

      return await this.recordModel.destroy({where:{id:recordId}})
   
    }

    async getAll(user){
      const records = await this.recordModel.findAll({where:{user_id:user.id}})
      return records.map((record)=>fromRecordModelToEntity(record))
    }
    
    }