import { Router } from 'express';
import AdminController from '../controllers/AdminController';
const AdminAPIs = Router();
const AdminAuthRoute = Router();
const AdminRoute = Router();
AdminRoute.use('/admin', AdminAPIs);
AdminRoute.use('/admin-auth', AdminAuthRoute);

/* Admin Authentication Routes */
AdminAuthRoute.post('/create-admin',AdminController.createAdmin);
AdminAuthRoute.post('/login',AdminController.login);


/* Admin Protected APIs Routes */

export default AdminRoute;