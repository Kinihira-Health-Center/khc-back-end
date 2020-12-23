const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    profileImg: {
      type: DataTypes.STRING
    },
    googleId: {
      type: DataTypes.STRING
    },
    facebookID: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  }, {});

  User.associate = (models) => {
    User.hasOne(models.token, {
      foreignKey: 'userId',
      as: 'token',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

export default userDefinition;
