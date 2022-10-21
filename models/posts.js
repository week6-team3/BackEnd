'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      checklistId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      completion: {
        type: DataTypes.INTEGER,
        defalutValue: 0,
      },
      sharing: {
        type: DataTypes.INTEGER,
        defalutValue: 0,
      },
      like: {
        type: DataTypes.INTEGER,
        defalutValue: 0,
      },
      where: {
        type: DataTypes.INTEGER,
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
      modelName: 'Posts',
    }
  );
  return Posts;
};
