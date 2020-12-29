import Router from 'express';
import MedecineController from '../controllers/medecineController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
// import isAdmin from '../middlewares/isAdmin';
import paginate from '../middlewares/paginateMiddleware';

const router = Router();

router.post('/medecines', asyncErrorHandler(MedecineController.addMedecine));
router.patch('/medecines/:id', asyncErrorHandler(MedecineController.changeMedecine));
router.get('/medecines', MedecineController.viewMedecines, paginate.paginatedRetrievedData);
// router.get('/medecines', tokenValidation, MedecineController.viewMedecines, paginate.paginatedRetrievedData);
//router.get('/medecines', MedecineController.viewMedecines, paginate.paginatedRetrievedData);
 router.delete('/medecines/:id', asyncErrorHandler(MedecineController.removeMedecine));

export default router;
