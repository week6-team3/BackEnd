'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, { foreignKey: 'userId', sourceKey: 'userId' });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defalutValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defalutValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
