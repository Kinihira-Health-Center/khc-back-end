import Router from 'express';
import MedecineController from '../controllers/medecineController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
// import isAdmin from '../middlewares/isAdmin';
import paginate from '../middlewares/paginateMiddleware';

const router = Router();

router.post('/medecines', asyncErrorHandler(MedecineController.addMedecine));
// router.patch('/medecines/:id', asyncErrorHandler(MedecineController.changePatient));
// router.get('/leagues', tokenValidation, LeagueController.viewLeagues, paginate.paginatedRetrievedData);
//router.get('/medecines', MedecineController.viewMedecines, paginate.paginatedRetrievedData);
 //router.delete('/medecines/:id', asyncErrorHandler(MatientController.removeMedecine));

export default router;
