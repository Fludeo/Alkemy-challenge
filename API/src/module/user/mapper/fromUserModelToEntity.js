const User = require("../entity/user_entity");
const fromRecordModelToEntity = require('../../record/mapper/recordModelToEntity')
module.exports = function FromUserModelToEntity({id,name,email,hash,createdAt,updatedAt,deletedAt,records}) {

    const user=  new User(
      id,
      name,
      email,
      hash,
      createdAt,
      updatedAt,
      deletedAt,
      records?records.map((record)=>fromRecordModelToEntity(record)):[] ,
    ) 
return user
  };
  