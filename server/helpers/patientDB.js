import models from '../models';
const {
  patient
} = models;
/**
 * class to deal with all needed operations
 * on the location table
 */
class PatientDB {
  /**
   * Finds the user's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findPatientByAttr(attr, val) {
    const record = await patient.findOne({
      where: { [attr]: val },
    });
    return record;
  }
  /**
   * insert generated patient into table in the DB.
   * @param {object} thePatient The location
   * @param {integer} userId The user id.
   * @returns {string} The users's location.
   */
  static async savePatient(thePatient) {
    const record = await patient.create({
      ...thePatient,

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
  static async updatePatient(data, id) {
    const record = await patient.update({
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
  static async findAllPatients(skip, start) {
    const records = await patient.findAndCountAll({
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
  static async deletePatient(id) {
    await patient.destroy({ where: { id } });
  }
}
export default PatientDB;