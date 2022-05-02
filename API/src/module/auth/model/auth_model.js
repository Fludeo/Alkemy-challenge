const { DataTypes, Model } = require('sequelize');

class AuthModel extends Model {

    /**
     * 
     * @param {Sequelize} sequelizeInstance 
     * @returns {AuthModel}
     */

static setup(sequelizeInstance) {
    AuthModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Auth',
        tableName: 'tokens',
        underscored: true,
        paranoid: false,
      }
    );

    return AuthModel;
  }

}
module.exports = AuthModel;