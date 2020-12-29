import models from '../models';
const {
  medecine
} = models;
/**
 * class to deal with all needed operations
 * on the medecine table
 */
class MedecineDB {
  /**
   * Finds the consultation's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findMedecineByAttr(attr, val) {
    const record = await medecine.findOne({
      where: { [attr]: val },
    });
    return record;
  }
  /**
   * insert generated consultation into table in the DB.
   * @param {object} theMedecine The medecine
   *
   * @returns {string} The medecine's record.
   */
  static async saveMedecine(theMedecine) {
    const record = await medecine.create({
      ...theMedecine,

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
  static async updateMedecine(data, id) {
    const record = await medecine.update({
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
  static async findAllMedecines(skip, start) {
    const records = await medecine.findAndCountAll({
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
  static async deleteMedecine(id) {
    await medecine.destroy({ where: { id } });
  }
}
export default MedecineDB;