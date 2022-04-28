const { DataTypes, Model } = require('sequelize');

class UserModel extends Model {

    /**
     * 
     * @param {Sequelize} sequelizeInstance 
     * @returns {UserModel}
     */

static setup(sequelizeInstance) {
    UserModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        paranoid: true
      }
    );

    return UserModel;
  }

}
module.exports = UserModel;