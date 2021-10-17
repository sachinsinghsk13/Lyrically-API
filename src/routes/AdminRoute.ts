import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import CategoryController from '../controllers/CategoryController'
import ArtistController from '../controllers/ArtistController'
import AdminAuthentication from '../middlewares/AdminAuthentication';
import adminRouteValidMW from '../middlewares/validation-middlewares/AdminRouteValidation';
import WebMenuController from '../controllers/WebMenuController';
const router = Router();

// ---------------------- ADMIN AUTH  API ---------------------------------------------------------
router.post('/admin/create-admin',AdminController.createAdmin);
router.post('/admin/login',adminRouteValidMW.adminlogin, AdminController.login);

/** WEB MENU APIs */
router.get('/webmenus', WebMenuController.adminWebMenus);
router.get('/webmenus/:menuId', WebMenuController.getMenu);
router.put('/webmenus/:menuId', AdminAuthentication, adminRouteValidMW.addWebMenu, WebMenuController.updateMenu);
router.delete('/webmenus/:menuId', AdminAuthentication, WebMenuController.deleteMenu);
router.post('/webmenus', AdminAuthentication, adminRouteValidMW.addWebMenu, WebMenuController.createWebMenu);



// ----------------------------CATEGORY-- API------------------------------------------------------

router.post('/categories', AdminAuthentication, CategoryController.createCategory);
router.get('/categories', CategoryController.getAllCategory);
router.get('/categories/:id', CategoryController.deleteCategory);
router.post('/categories', AdminAuthentication, CategoryController.updateCategory);


// -------------------------------------Artist-API-------------------------------------

router.get('/artist', ArtistController.getAllArtists);
router.put('/artist', adminRouteValidMW.addArtist,ArtistController.createArtist);
//-----------------------------------Album-API----------------------------------------------




export default router;
