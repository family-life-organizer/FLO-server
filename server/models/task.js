import db from '../models'

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT,
    dueDate: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model:db.User,
        key: 'id'
      }
    }
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    })
    Task.belongsTo(models.User, {
      foreignKey: 'assigneeId',
      as: 'assignee'
    })
  };
  return Task;
};