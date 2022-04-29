const User = require("../entity/user_entity");

module.exports = function FromUserModelToEntity({id,name,email,hash,createdAt,updatedAt,deletedAt,records}) {

    const user=  new User(
      id,
      name,
      email,
      hash,
      createdAt,
      updatedAt,
      deletedAt,
      records ,
    ) 
return user
  };
  