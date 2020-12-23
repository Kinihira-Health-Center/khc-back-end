const consumableDefinition = (sequelize, DataTypes) => {
    const Consumable = sequelize.define('consumable', {
      name: { type: DataTypes.STRING },
      prise: { type: DataTypes.STRING },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE }
    }, {});
  
    return Consumable;
  };
  
  export default consumableDefinition;
  