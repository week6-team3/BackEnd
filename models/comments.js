'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Posts, { foreignKey: 'postId' });
      
    }
  }
  Comments.init({
    commentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      reference: {
        model: 'Users',
        key: 'userId'
      },
      type: DataTypes.INTEGER
    },
    postId: {
      allowNull: false,
      reference: {
        model: 'Posts',
        key: 'postId'
      },
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      defaultValue: DataTypes.NOW,
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      defaultValue: DataTypes.NOW,
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};