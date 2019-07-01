
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  User.associate = (models) => {
    User.BelongsTo(models.Family, {
      foreignKey: 'userId',
      as: 'family',
    });
  };
  return User;
};

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     firstName: {
//       type: DataTypes.STRING, 
//       allowNull: false
//     },
//     lastName: DataTypes.STRING,
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     isAdmin: DataTypes.BOOLEAN,
//   }, {});
//   User.associate = (models) => {
//     User.BelongsTo(models.Family, {
//       foreignKey: 'userId',
//       as: 'family',
//     });
//   };
//   return User;
// };