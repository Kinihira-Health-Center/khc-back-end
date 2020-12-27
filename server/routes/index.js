import Router from 'express';

import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import receptionRoutes from './receptionRoutes';
import consultationRoutes from './consultationRoutes';
import labRoutes from './labRoutes';
import pharmacyRoutes from './pharmacyRoutes';
import medecineRoutes from './medecineRoutes';

const router = Router();

router.use(authRoutes);
router.use('/admin', adminRoutes);
router.use('/reception', receptionRoutes);
router.use('/consultation', consultationRoutes);
router.use('/lab', labRoutes);
router.use('/pharmacy', pharmacyRoutes);
router.use('/medecine', medecineRoutes);

export default router;
