import { Request, Response } from 'express';
import * as yup from 'yup';
/*  Yup Schemeas */
const adminRouteValidations = {
    adminLogin:  yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().required('password is required')
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
}

const adminRouteValidMW = new AdminRouteValidationMiddlewares();
export default adminRouteValidMW;