 
const {default:  DIContainer, object, use, factory,} = require('rsdi');
const { Sequelize } = require('sequelize');
const {RecordController,RecordService,RecordRepository, RecordModel} = require('../module/record/module')
const {UserController,UserService, UserRepository, UserModel,} = require ('../module/user/module')
const {AuthController,AuthService ,AuthRepository, AuthModel} = require ('../module/auth/module')
const SetDataAssociations = require('./data_association');




const dbConfig = ()=>{

  if(process.env.PROJECT_STATUS === 'production'){
    const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/production_database.db'
    })
    return sequelize
  }
  else{
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './data/development_database.db'
    });
    return sequelize
  }
  
}


  /**
 *
 * @param {DIContainer} container
 */

   function configureAuthModel(container){

    return AuthModel.setup(container.get('sequelize'))
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
 * Defines common dependencies
 */


  function addCommonDefinitions(container) {
    container.add({
      sequelize: factory(dbConfig)
    });
  }

/**
 *
 * @param {DIContainer} container
 * Defines Record Module dependencies
 */

  function addRecordDefinitions(container) {
    container.add({
      RecordController: object(RecordController).construct(use(RecordService),use(AuthService)),
      RecordService: object(RecordService).construct(use(RecordRepository)),
      RecordRepository: object(RecordRepository).construct(use(RecordModel)),
      RecordModel: factory(configureRecordModel),
    
    });
  }
  
  /**
 *
 * @param {DIContainer} container
 * Defines User Module dependencies
 */

   function addUserDefinitions(container) {
    container.add({
      UserController: object(UserController).construct(use(UserService),use(AuthService)),
      UserService: object(UserService).construct(use(UserRepository)),
      UserRepository: object(UserRepository).construct(use(UserModel)),
      UserModel: factory(configureUserModel),
    
    });
  }




  /**
 *
 * @param {DIContainer} container
 * Defines Auth Module dependencies
 */

   function addAuthDefinitions(container) {
    container.add({
      AuthController: object(AuthController).construct(use(AuthService)),
      AuthService: object(AuthService).construct(use(UserService),use(AuthRepository)),
      AuthRepository: object(AuthRepository).construct(use(AuthModel)),
      AuthModel: factory(configureAuthModel)
    
    });
  }

/**
 * @returns {DIContainer}
 * Dependency Injection container boostrapper
 */

  module.exports = function ConfigDIC() {

    const container = new DIContainer();
  
    addCommonDefinitions(container);
    addAuthDefinitions(container)
    addRecordDefinitions(container);
    addUserDefinitions(container);
    container.get('sequelize').sync()
    SetDataAssociations(container);
    
    return container;
  };