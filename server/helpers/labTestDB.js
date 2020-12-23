import models from '../models';
const {
  labTest
} = models;
/**
 * class to deal with all needed operations
 * on the location table
 */
class LabTestDB {
  /**
   * Finds the consultation's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findLabTestByAttr(attr, val) {
    const record = await labTest.findOne({
      where: { [attr]: val },
    });
    return record;
  }
  /**
   * insert generated consultation into table in the DB.
   * @param {object} theLabTest The location
   *
   * @returns {string} The users's location.
   */
  static async saveLabTest(theLabTest) {
    const record = await labTest.create({
      ...theLabTest,

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
  static async updateLabTest(data, id) {
    const record = await labTest.update({
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
  static async findAllLabTests(skip, start) {
    const records = await labTest.findAndCountAll({
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
  static async deleteLabTest(id) {
    await labTest.destroy({ where: { id } });
  }
}
export default LabTestDB;