


module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT,
    dueDate: {
      type: DataTypes.DATE,
    },
    status: DataTypes.STRING,
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
    Task.belongsTo(models.Family, {
      foreignKey: 'familyId',
      as: 'family'
    })
  };
  return Task;
};