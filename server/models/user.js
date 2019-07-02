module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = models => {
    User.belongsTo(models.Family, {
      foreignKey: "familyId",
      as: "family"
    });
    User.hasMany(models.Task, {
      foreignKey: "assigneeId",
      as: "tasks"
    });
  };
  return User;
};
