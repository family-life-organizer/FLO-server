
module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    name: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {});
  Family.associate = (models) => {
    Family.hasMany(models.User, {
      foreignKey: 'familyId',
      as: 'users',
    });
    Family.hasMany(models.Category, {
      foreignKey: 'familyId',
      as: 'categories',
    });
  };
  return Family;
};