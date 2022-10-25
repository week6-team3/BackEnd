'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        references: {
          model: 'Users',
          key: 'userId'
        },
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade', // 부모 데이터가 사라지면 같이 삭제
      },
      postId: {
        references: {
          model: 'Posts',
          key: 'postId'
        },
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade', // 부모 데이터가 사라지면 같이 삭제
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      }
    });
  }, 
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};