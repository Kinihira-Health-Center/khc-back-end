import patientDB from '../helpers/patientDB';
import pagination from '../helpers/paginateHelper';
/**
 * This class contains all methods
 * required to handle
 * signup and login and logout endpoints' request.
 */
class PatientController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async addPatient(req, res) {
    // const patientExists = await patientDB.findPatientByAttr("name", req.body.name);
    // if (patientExists) {
    //   return res.status(422).json({
    //     status: 422,
    //     error: 'This patient already exists'
    //   });
    // }
    const patient = await patientDB.savePatient({ ...req.body });
    return res.status(201).json({
      status: 201,
      message: `${patient.firstname} was created successfully`,
      data: patient
    });
  }
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async changePatient(req, res) {
    const patientExists = await patientDB.findPatientByAttr("id", parseInt(req.params.id, 10));
    if (patientExists) {
      await patientDB.updatePatient({ ...req.body }, patientExists.id);
      const patient = await patientDB.findPatientByAttr("id", patientExists.id);
      return res.status(200).json({
        status: 200,
        message: `${patient.firstname} was successfully changed`,
        data: patient
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'This patient is not found'
    });
  }
  /**
   * This method handle the view patient request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The next middleware.
   * @returns {object} The status and some data of the user.
   */
  static async viewPatients(req, res, next) {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const patients = await patientDB.findAllPatients(skip, start);
    const AllData = patients.rows;
    const countAllData = patients.count;
    if (patients.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `There are no patients yet`
      });
    }
    req.data = { AllData, countAllData, start, end, pages, skip, paginate };
    next();
  }
  /**
   * This method handle the view patient request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async viewPatient(req, res) {
    const { id } = req.params;
    const patient = await patientDB.findPatientByAttr('id', parseInt(id, 10));
    if (!patient) {
      return res.status(404).json({
        status: 404,
        error: "The patient was not found"
      });
    }
    return res.status(200).json({
      status: 200,
      message: "The patient fetched successfully",
      data: patient
    });
  }
  /**
   * This method handle the view patient request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async removePatient(req, res) {
    const { id } = req.params;
    const patient = await patientDB.findPatientByAttr('id', parseInt(id, 1));
    if (!patient) {
      return res.status(404).json({
        status: 404,
        error: "The patient was not found"
      });
    }
    await patientDB.deletePatient(patient.id);
    return res.status(204).json({
      status: 200,
      message: "The patient removed successfully",
      data: patient
    });
  }
}
export default PatientController;