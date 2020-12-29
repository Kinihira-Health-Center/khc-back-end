import medecineDB from '../helpers/medecineDB';
import pagination from '../helpers/paginateHelper';
/**
 * This class contains all methods
 * required to handle
 * signup and login and logout endpoints' request.
 */
class MedecineController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async addMedecine(req, res) {
    // const patientExists = await patientDB.findPatientByAttr("name", req.body.name);
    // if (patientExists) {
    //   return res.status(422).json({
    //     status: 422,
    //     error: 'This patient already exists'
    //   });
    // }
    const medecine = await medecineDB.saveMedecine({ ...req.body });
    return res.status(201).json({
      status: 201,
      message: `${medecine.name} was created successfully`,
      data: medecine
    });
  }
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async changeMedecine(req, res) {
    const medecineExists = await medecineDB.findMedecineByAttr("id", parseInt(req.params.id, 10));
    if (medecineExists) {
      await patientDB.updateMedecine({ ...req.body }, medecineExists.id);
      const patient = await medecineDB.findMedecineByAttr("id", medecineExists.id);
      return res.status(200).json({
        status: 200,
        message: `${medecine.name} was successfully changed`,
        data: medecine
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
  static async viewMedecines(req, res, next) {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const medecines = await medecineDB.findAllMedecines(skip, start);
    const AllData = medecines.rows;
    const countAllData = medecines.count;
    if (medecines.rows.length === 0) {
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
  static async viewMedecine(req, res) {
    const { id } = req.params;
    const medecine = await madecineDB.findMedecineByAttr('id', parseInt(id, 10));
    if (!medecine) {
      return res.status(404).json({
        status: 404,
        error: "The patient was not found"
      });
    }
    return res.status(200).json({
      status: 200,
      message: "The patient fetched successfully",
      data: medecine
    });
  }
  /**
   * This method handle the view patient request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async removeMedecine(req, res) {
    const { id } = req.params;
    const medecine = await medecineDB.findMedecineByAttr('id', parseInt(id, 10
      ));
    if (!medecine) {
      return res.status(404).json({
        status: 404,
        error: "The patient was not found"
      });
    }
    await medecineDB.deleteMedecine(medecine.id);
    return res.status(204).json({
      status: 200,
      message: "The patient removed successfully",
      data: medecine
    });
  }
}
export default MedecineController;