import { Request, Response } from 'express';
import adminRouteValidations from './schemas/AdminRouteValidationSchema';


/* Validation Middlewares */
class AdminRouteValidationMiddlewares {
    async adminlogin(req: Request, res: Response, next: any) {
        try {
            await adminRouteValidations.adminLogin.validate(req.body);
            next();
        } catch (err) {
            res.status(400).json(err).end();
        }
    }

    async addWebMenu(req: Request, res: Response, next: any) {
        try {
            await adminRouteValidations.addWebMenu.validate(req.body);
            next();
        } catch (err) {
            res.status(400).json(err).end();
        }
    }

    async addCategory(req: Request, res: Response, next: any) {
        try {
            await adminRouteValidations.addCategory.validate(req.body);
            next();
        } catch (err) {
            console.log(err);
            res.status(400).json(err).end();
        }
    }

    async addArtist(req: Request, res: Response, next: any) {
        try {
            await adminRouteValidations.addArtist.validate(req.body);
            next();
        } catch (err) {
            console.log(err);
            res.status(400).json(err).end();
        }
    }
    
}
const adminRouteValidMW = new AdminRouteValidationMiddlewares();
export default adminRouteValidMW;