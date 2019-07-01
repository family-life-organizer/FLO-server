
module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    name: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {});
  Family.associate = (models) => {
    // associations can be defined here
    Family.hasMany(models.User, {
      foreignKey: 'userId',
      as: 'users',
    });
  };
  return Family;
};