import models from '../models';
const {
  consultation
} = models;
/**
 * class to deal with all needed operations
 * on the location table
 */
class ConsultationDB {
  /**
   * Finds the consultation's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findConsultationByAttr(attr, val) {
    const record = await consultation.findOne({
      where: { [attr]: val },
    });
    return record;
  }
  /**
   * insert generated consultation into table in the DB.
   * @param {object} theConsultation The location
   *
   * @returns {string} The users's location.
   */
  static async saveConsultation(thePatient) {
    const record = await consultation.create({
      ...theConsultation,

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
  static async updateConsultation(data, id) {
    const record = await consultation.update({
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
  static async findAllCosultations(skip, start) {
    const records = await consultation.findAndCountAll({
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
  static async deleteConsultation(id) {
    await consultation.destroy({ where: { id } });
  }
}
export default ConsultationDB;