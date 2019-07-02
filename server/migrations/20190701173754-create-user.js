'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }, 
      familyId: {
        type: Sequelize.INTEGER,
        OnDelete: 'CASCADE',
        references: {
          model: 'Families',
          key: 'id',
          as: 'familyId'
        }
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
    return queryInterface.dropTable('Users');
  }
};