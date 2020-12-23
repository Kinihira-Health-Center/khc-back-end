import models from '../models';
const {
  test
} = models;
/**
 * class to deal with all needed operations
 * on the location table
 */
class TestDB {
  /**
   * Finds the consultation's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findTestByAttr(attr, val) {
    const record = await test.findOne({
      where: { [attr]: val },
    });
    return record;
  }
  /**
   * insert generated consultation into table in the DB.
   * @param {object} theTest The location
   *
   * @returns {string} The users's location.
   */
  static async saveTest(theTest) {
    const record = await test.create({
      ...theTest,

      created_at: new Date(),
      updated_at: new Date()
    });
    return record;
  }
  /**
   * update location into table in the DB
   * @param {object} data
   * @param {integer} id
   * @returns {string} The users's interaction.
   */
  static async updateTest(data, id) {
    const record = await test.update({
      ...data
    },
    {
      where: { id }
    });
    return record;
  }
  /**
   * insert generated code into table in the DB.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} groups request data.
   */
  static async findAllTest(skip, start) {
    const records = await test.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return records;
  }
  /**
   * delete patientfrom validlocation table in the DB.
   * @param {integer} id The request sent by a user.
   * @returns {string} The users's location.
   */
  static async deleteTest(id) {
    await test.destroy({ where: { id } });
  }
}
export default TestDB;