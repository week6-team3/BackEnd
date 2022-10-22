'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /** 
       * this.belongsTo(models.Users, { foreignKey: 'userId' });
       * this.belongsTo(models.Posts, { foreignKey: 'postId' });
       */
    }
  }
  Likes.init({
    likeId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    // reference: {
    //   model: 'Users',
    //   key: 'userId'
    // },
    allowNull: false,
    type: DataTypes.INTEGER,
    onDelete: 'cascade', // 부모 데이터가 사라지면 같이 삭제
  },
  postId: {
    // reference: {
    //   model: 'Posts',
    //   key: 'postId'
    // },
    allowNull: false,
    type: DataTypes.INTEGER,
    onDelete: 'cascade', // 부모 데이터가 사라지면 같이 삭제
  },
  createdAt: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};