import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const AdminRoute = Router();
AdminRoute.get('/admin/test',AdminController.hello);
export default AdminRoute;