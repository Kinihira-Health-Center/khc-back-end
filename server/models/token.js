const tokenDefinition = (sequelize, DataTypes) => {
  const Token = sequelize.define('token', {
    value: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
  }, {});

  Token.associate = (models) => {
    Token.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };

  return Token;
};

export default tokenDefinition;
