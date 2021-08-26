import { Admin } from "../models/AdminModel";
import * as jsonwebtoken from 'jsonwebtoken';

class JwtTokenUtil {

    createToken(admin: any) {
        return jsonwebtoken.sign(admin, process.env.TOKEN_SECRET, {
            algorithm: 'HS256',
            issuer: 'Lyrically',
            subject: admin.username, 
            expiresIn: process.env.TOKEN_EXPIRATION_TIME
        });
    }

    authenticateAdmin(token: string) {
        try {
            return jsonwebtoken.verify(token, process.env.TOKEN_SECRETE);
        } catch (error) {
            return null;
        }
    }

}

export default new JwtTokenUtil();