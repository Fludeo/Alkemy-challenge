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
        },
        password: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        records: {
          type: DataTypes.ARRAY,
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