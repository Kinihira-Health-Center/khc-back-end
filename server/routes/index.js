import Router from 'express';

import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import receptionRoutes from './receptionRoutes';
import consultationRoutes from './consultationRoutes';
import labRoutes from './labRoutes';
import pharmacyRoutes from './pharmacyRoutes';

const router = Router();

router.use(authRoutes);
router.use('/admin', adminRoutes);
router.use('/reception', receptionRoutes);
router.use('/consultation', consultationRoutes);
router.use('/lab', labRoutes);
router.use('/pharmacy', pharmacyRoutes);

export default router;
