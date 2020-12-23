import Router from 'express';
import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import { signUp, signIn, socialSignIn } from '../middlewares/authValidator';
import tokenValidation from '../middlewares/tokenValidation';
import paginate from '../middlewares/paginateMiddleware';
import router from './adminRoutes';


router
  .post('/signup', signUp, passwordHasher, asyncErrorHandler(AuthController.signUp))
  .post('/social/signin', socialSignIn, asyncErrorHandler(AuthController.socialSignIn))
  .post('/signin', signIn, asyncErrorHandler(AuthController.signIn))
  .post('/logout', tokenValidation, asyncErrorHandler(AuthController.logout))
  .post('/users', tokenValidation, passwordHasher, asyncErrorHandler(AuthController.AdminAddUser))
  .get('/user', tokenValidation, asyncErrorHandler(AuthController.getUser))
  .delete('/users/:id', tokenValidation, asyncErrorHandler(AuthController.removeUser))
  .get('/users', tokenValidation, AuthController.viewReporters, paginate.paginatedRetrievedData);

export default router;
