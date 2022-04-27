const { DataTypes, Model } = require('sequelize');


class RecordModel extends Model {

    /**
     * 
     * @param {Sequelize} sequelizeInstance 
     * @returns {RecordModel}
     */

static setup(sequelizeInstance) {
    RecordModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        concept: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
  
     
   
    
      
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Record',
        tableName: 'records',
        underscored: true,
        paranoid: true
      }
    );

    return RecordModel;
  }

}
module.exports = RecordModel;