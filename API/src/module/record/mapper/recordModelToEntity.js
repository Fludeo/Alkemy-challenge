const Record = require('../entity/record_entity');

module.exports = function FromRecordModelToEntity({id,concept,date,amount,type,category,user_id,createdAt,updatedAt,deletedAt}){

    const record = new Record(id,concept,amount,type,category,date,user_id,createdAt,updatedAt,deletedAt)
    return record
}
  