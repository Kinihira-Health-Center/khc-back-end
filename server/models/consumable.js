const consumableDefinition = (sequelize, DataTypes) => {
    const Consumable = sequelize.define('consumable', {
      name: { type: DataTypes.STRING },
      prise: { type: DataTypes.STRING },
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
  
    return Consumable;
  };
  
  export default consumableDefinition;
  