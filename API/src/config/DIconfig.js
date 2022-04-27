 
 const {
    default:  DIContainer, object, use, factory,
  } = require('rsdi');
const { Sequelize } = require('sequelize');
const {DefaultController} = require('../module/default/module')
const {RecordController,RecordService,RecordRepository, RecordModel} = require('../module/record/module')
const {
  UserController,
  UserService,
  UserRepository,
  UserModel,
   } = require ('../module/user/module')




const dbConfig = ()=>{
    const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/data/database.db'
  });
return sequelize
}

/**
 *
 * @param {DIContainer} container
 */

 function configureRecordModel(container){

return RecordModel.setup(container.get('sequelize'))
}

/**
 *
 * @param {DIContainer} container
 */

 function configureUserModel(container){

  return UserModel.setup(container.get('sequelize'))
  }



/**
 *
 * @param {DIContainer} container
 */


  function addCommonDefinitions(container) {
    container.add({
      sequelize: factory(dbConfig),
      DefaultController: object(DefaultController).construct(use(RecordService)),

    });
  }

/**
 *
 * @param {DIContainer} container
 */

  function addRecordDefinitions(container) {
    container.add({
      RecordController: object(RecordController).construct(use(RecordService)),
      RecordService: object(RecordService).construct(use(RecordRepository)),
      RecordRepository: object(RecordRepository).construct(use(RecordModel)),
      RecordModel: factory(configureRecordModel),
    
    });
  }


  /**
 *
 * @param {DIContainer} container
 */

   function addUserDefinitions(container) {
    container.add({
      UserController: object(UserController).construct(use(UserService)),
      UserService: object(UserService).construct(use(UserRepository)),
      UserRepository: object(UserRepository).construct(use(UserModel)),
      UserModel: factory(configureUserModel),
    
    });
  }
/**
 * @returns {DIContainer}
 */

  module.exports = function ConfigDIC() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addRecordDefinitions(container);
    addUserDefinitions(container)
  
    return container;
  };