import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('AdminController');

class AdminController {
    async createAdmin(req: Request, res: Response) {
        try {
            let admin = req.body;
            admin = await AdminService.createAdmin(admin);
            res.json({ message: 'Registration Successful', id: admin._id });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.httpStatusCode).json(error.response).end();
            } else {
                res.status(500).json(error).end();
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            let credential = req.body;
            let token = await AdminService.login(credential);
            res.json(token);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.httpStatusCode).json(error.response);
            }
            else {
                res.status(500).json({ message: 'Can not process request now. please try after some time.' }).end();
            }
        }
    }

    
}

export default new AdminController();