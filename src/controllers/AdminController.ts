import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import API from "../utilities/api-response";
import CustomException from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('AdminController');

class AdminController {
    async createAdmin(req: Request, res: Response) {
        try {
            let admin = req.body;
            admin = await AdminService.createAdmin(admin);
            API.success()
            .attachData({userId: admin._id})
            .setMessage('Registration Successfull')
            .send(res);
        } catch (error) {
            logger.error(error);
            API.error(error).send(res);
        }
    }

    async login(req: Request, res: Response) {
        try {
            let credential = req.body;
            let loginRespnse = await AdminService.login(credential);
            API.success()
            .attachData(loginRespnse)
            .setMessage('Login Successfull')
            .send(res);
        } catch (error) {
            API.error(error).send(res);
        }
    }

    
}

export default new AdminController();