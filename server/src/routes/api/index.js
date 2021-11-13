import { Router } from 'express';
import usersRoutes from './users.js';
import messagesRoutes from './messages.js';
import patientsRoutes from './patients.js';
import eidsRoutes from './eids.js';
import specsRoutes from './specializations.js';
import doctorsRoutes from './doctors.js';
import imagesRoutes from './images.js';
import serviceTypesRoutes from './serviceTypes.js';
import serviceRoutes from './services.js';
import labResultsRoutes from './labResult.js';
import appointmentsRoutes from './appointments.js';
import uziparentsRoutes from './uziparents.js';
import uzichildsRoutes from './uzichilds.js';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/doctors', doctorsRoutes);
router.use('/eids', eidsRoutes);
router.use('/images', imagesRoutes);
router.use('/labresults', labResultsRoutes);
router.use('/messages', messagesRoutes);
router.use('/patients', patientsRoutes);
router.use('/services', serviceRoutes);
router.use('/servicetypes', serviceTypesRoutes);
router.use('/specs', specsRoutes);
router.use('/users', usersRoutes);
router.use('/uziparents', uziparentsRoutes);
router.use('/uzichilds', uzichildsRoutes);

export default router;
