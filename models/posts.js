'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
      this.hasMany(models.Comments, { foreignKey: 'commentId', /* sourceKey: 'commentId' */ });
      // this.hasMany(models.Checklists, { foreignKey: 'checklistId', /* sourceKey: 'checklistId' */ });
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
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      completion: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sharing: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'false',
      },
      likeCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      travel: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};