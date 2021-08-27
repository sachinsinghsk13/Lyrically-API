import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AdminAuthentication from '../middlewares/AdminAuthentication';
const AdminAPIs = Router();
const AdminAuthRoute = Router();
const AdminRoute = Router();
AdminRoute.use('/admin', AdminAuthentication ,AdminAPIs);
AdminRoute.use('/admin-auth', AdminAuthRoute);

/* Admin Authentication Routes */
AdminAuthRoute.post('/create-admin',AdminController.createAdmin);
AdminAuthRoute.post('/login',AdminController.login);


/* Admin Protected APIs Routes */
AdminAPIs.get('/test', (req, res) => {
    res.json({msg: `Hello, ${req['user'].name}`});
   res.end(); 
})
export default AdminRoute;