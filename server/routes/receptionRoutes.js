import Router from 'express';
import PatientController from '../controllers/patientController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
// import isAdmin from '../middlewares/isAdmin';
// import paginate from '../middlewares/paginateMiddleware';

const router = Router();

router.post('/patients', asyncErrorHandler(PatientController.addPatient));
 router.patch('/patients/:id', asyncErrorHandler(PatientController.changePatient));
// router.get('/leagues', tokenValidation, LeagueController.viewLeagues, paginate.paginatedRetrievedData);
// router.get('/leagues/:id', tokenValidation, isAdmin, asyncErrorHandler(LeagueController.viewLeague));
 router.delete('/patients/:id', asyncErrorHandler(PatientController.removePatient));

export default router;
