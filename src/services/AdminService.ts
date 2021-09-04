import { Admin, AdminModel } from "../models/AdminModel";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
import * as bcryptjs from 'bcryptjs';
import { Credential } from "../utilities/api-models/credential";
import jwtTokenUtil from "../utilities/jwt-token-util";
const logger = createModuleLogger('AdminService');
class AdminService {

    async createAdmin(admin: Admin) {
        try {
            // hash password
            admin.password = bcryptjs.hashSync(admin.password, bcryptjs.genSaltSync());
            let doc = new AdminModel(admin);
            doc = await doc.save();
            return doc;
        } catch (err) {
            // its a validation error
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomError('Validation Error', 400, response);
            }
            throw new Error('Error while saving data');
        }
    }

    async login(credential: Credential) {
        let admin = await AdminModel.findOne({username: credential.username}).exec();
        if (admin) {
           if (bcryptjs.compareSync(credential.password, admin.password)) {
               let payload = {
                   username: admin.username,
                   email: admin.email,
                   name: admin.name
               };
                const token = jwtTokenUtil.createToken(payload);
                return {token, user: payload};
           } else {
               throw new CustomError('Wrong Password', 200, {message: 'Password Incorrect'});
           }
        } else {
            throw new CustomError('username not found', 200, {message: 'Username not found.'});
        }
    }

}

export default new AdminService();