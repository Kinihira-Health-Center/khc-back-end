const up = (queryInterface, Sequelize) => queryInterface.createTable('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  profileImg: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  facebookID: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'SIMPLE_USER'
  },
  created_at: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  updated_at: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  }
});
const down = (queryInterface) => queryInterface.dropTable('user');
export { up, down };
