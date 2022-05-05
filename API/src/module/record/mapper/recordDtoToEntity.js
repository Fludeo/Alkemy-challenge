const Record = require('../entity/record_entity')

/**
 * 
 * @param {import('../dto/record_dto')} recordDto 
 */

module.exports = function FromRecordDtoToEntity({id,concept,date,amount,type,category}){

    const record = new Record(id,concept,amount,type,category,date)
    return record
}