import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import CategoryController from '../controllers/CategoryController'
import AdminAuthentication from '../middlewares/AdminAuthentication';
import adminRouteValidMW from '../middlewares/validation/AdminRouteValidation';

const AdminAPIs = Router();
const AdminAuthRoute = Router();
const AdminRoute = Router();
AdminRoute.use('/admin', AdminAuthentication ,AdminAPIs);
AdminRoute.use('/admin-auth', AdminAuthRoute);


/**
 * Login Credentials
 * @typedef {object} LoginCredentials
 * @property {string} username.required username of admin
 * @property {string} password.required lorem sfoasdfis fsadfiosdhf sdf9sdfh90sdaf sdf
 */
AdminAuthRoute.post('/create-admin',AdminController.createAdmin);

/**
 * POST /api/admin-auth/login
 * @tag Admin
 * @summary API for admin login
 */
AdminAuthRoute.post('/login',adminRouteValidMW.adminlogin, AdminController.login);


/* Admin Protected APIs Routes */
AdminAPIs.get('/test', (req, res) => {
    res.json({msg: `Hello, ${req['user'].name}`});
   res.end(); 
})

AdminAPIs.get('/webmenus', AdminController.adminWebMenus);
AdminAPIs.post('/webmenus', adminRouteValidMW.addWebMenu, AdminController.createWebMenu);

AdminAPIs.post('/categories', CategoryController.Createcategory);
AdminAPIs.get('/categories', CategoryController.GetAllCategory);
export default AdminRoute;