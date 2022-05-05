const Record = require('../entity/record_entity');

module.exports = function FromRecordModelToEntity({id,concept,date,amount,type,category}){

    const record = new Record(id,concept,amount,type,category,date)
    return record
}
  