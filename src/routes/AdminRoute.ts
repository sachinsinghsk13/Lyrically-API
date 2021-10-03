import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import CategoryController from '../controllers/CategoryController'
import ArtistController from '../controllers/ArtistController'
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
});

AdminAPIs.post('categories/create-catego', )

// Routes for Web Menus
AdminAPIs.get('/webmenus', AdminController.adminWebMenus);
AdminAPIs.get('/webmenus/:menuId', AdminController.getMenu);
AdminAPIs.put('/webmenus/:menuId', adminRouteValidMW.addWebMenu, AdminController.updateMenu);
AdminAPIs.delete('/webmenus/:menuId', AdminController.deleteMenu);
AdminAPIs.post('/webmenus', adminRouteValidMW.addWebMenu, AdminController.createWebMenu);



// ----------------------------CATEGORY-- API------------------------------------------------------

AdminAPIs.post('/categories', adminRouteValidMW.addCategory,CategoryController.Createcategory);
AdminAPIs.get('/categories', CategoryController.GetAllCategory);
AdminAPIs.get('/categories', CategoryController.DeleteCategory);
AdminAPIs.post('/categories', CategoryController.UpdateCategory);


// -------------------------------------Artist-API-------------------------------------

AdminAPIs.get('/Artist', ArtistController.GetAllArtist);
AdminAPIs.put('/Artist', adminRouteValidMW.addArtist,ArtistController.CreateArtist);
//-----------------------------------Album-API----------------------------------------------




export default AdminRoute;
