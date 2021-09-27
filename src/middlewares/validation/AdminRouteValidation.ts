import { Request, Response } from 'express';
import * as Yup from 'yup';
/*  Yup Schemeas */
const adminRouteValidations = {
    adminLogin: Yup.object().shape({
        username: Yup.string().required('username is required'),
        password: Yup.string().required('password is required')
    }),
    addCategory: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().optional()
    }),
    addArtist: Yup.object().shape({
        name:Yup.string().required('name is required'),

    }),
    addWebMenu: Yup.object().shape({
        title: Yup.string().required('Menu title is required'),
        path: Yup.string().optional(),
        icon: Yup.string().optional(),
        order: Yup.number().required('Must specify order for this menu item').positive('order must be positive'),
        hasSubmenu: Yup.boolean().default(false).required('hasSubmenu is required'),
        submenu: Yup.array().optional().of(Yup.object().shape({
            title: Yup.string().required('Menu title is required'),
            path: Yup.string().required('Path is requied for submenus'),
            icon: Yup.string().optional(),
            order: Yup.number().required()
        }))
    })
}

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