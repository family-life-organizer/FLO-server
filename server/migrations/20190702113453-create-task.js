'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      dueDate: {
        type: Sequelize.DATE
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          as: 'categoryId',
          key: 'id'
        }
      },
      familyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Families',
          as: 'familyId',
          key: 'id'
        }
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          as: 'assigneeId',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};