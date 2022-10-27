'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      completion: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sharing: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      likeCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      path : {
        type: Sequelize.STRING,
      },
      filename : {
        type: Sequelize.STRING,
      },
      travel: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  },
};
