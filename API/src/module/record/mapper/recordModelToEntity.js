const Record = require('../entity/record_entity');

module.exports = function FromRecordModelToEntity({id,concept,date,amount,type,category,createdAt,updatedAt,deletedAt}){

    const record = new Record(id,concept,amount,type,category,date,createdAt,updatedAt,deletedAt)
    return record
}
  