 
 const {
    default:  DIContainer, object, get, factory,
  } = require('rsdi');
const { Sequelize } = require('sequelize');
const DefaultController = require('../module/default/module')
const AccountingController = require('../module/accounting/module')


const dbConfig = ()=>{
    const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/data/database.sqlite'
  });
return sequelize
}

/**
 *
 * @param {import('rsdi').IDIContainer} container
 */
function addCommonDefinitions(container) {
    container.addDefinitions({
      sequelize: factory(dbConfig),
      DefaultController: object(DefaultController).construct(get('AccountingService')),

    });
  }

/**
 *
 * @param {import('rsdi').IDIContainer} container
 */
  function addAccountingDefinitions(container) {
    container.addDefinitions({
      AccountingController: object(AccountingController).construct(get('AccountingService')),

    });
  }


  module.exports = function ConfigDIC() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addAccountingDefinitions(container);
  
    return container;
  };