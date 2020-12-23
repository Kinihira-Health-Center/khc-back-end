import models from '../models';
const {
  consumable
} = models;
/**
 * class to deal with all needed operations
 * on the location table
 */
class ConsumableDB {
  /**
   * Finds the consultation's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findConsumableByAttr(attr, val) {
    const record = await consumable.findOne({
      where: { [attr]: val },
    });
    return record;
  }
  /**
   * insert generated consultation into table in the DB.
   * @param {object} theConsumable The location
   *
   * @returns {string} The users's location.
   */
  static async saveConsumable(theConsumable) {
    const record = await consumable.create({
      ...theConsumable,

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
  static async updateConsumable(data, id) {
    const record = await consumable.update({
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
  static async findAllConsumables(skip, start) {
    const records = await consumable.findAndCountAll({
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
  static async deleteConsumable(id) {
    await consumable.destroy({ where: { id } });
  }
}
export default ConsumableDB;
