'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 다른 테이블 모델이 없어서 일단 주석입니다 !! 
      this.hasMany(models.Posts,{
        as:"Posts",
        foreignKey:"userId",
      });

      this.hasMany(models.Likes,{
        as:"Likes",
        foreignKey:"userId",
      });

      this.hasMany(models.Comments,{
        as:"Comments",
        foreignKey:"userId",
      });
    }
  }
  Users.init({
    userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};