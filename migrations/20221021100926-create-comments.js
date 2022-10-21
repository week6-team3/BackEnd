'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        // reference: {
        //   model: 'Users',
        //   key: 'userId'
        // },
        type: Sequelize.INTEGER
      },
      postId: {
        allowNull: false,
        // reference: {
        //   model: 'Posts',
        //   key: 'postId'
        // },
        type: Sequelize.INTEGER
      },
      contentId: {
        allowNull: false,
        // reference: {
        //   model: 'Contents',
        //   key: 'contentId'
        // },
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        defaultValue: Sequelize.NOW,
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.NOW,
        allowNull: false,
        type: Sequelize.DATE
      },
      refreshToken: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};