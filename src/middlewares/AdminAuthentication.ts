import { Request, Response } from "express";
import jwtTokenUtil from "../utilities/jwt-token-util";

const AUTH_HEADER = 'Authorization';

export default function (req: Request, res: Response, next: any) {
    const authHeader = req.header(AUTH_HEADER);
    if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
            const token = authHeader.substr(7);
            const admin = jwtTokenUtil.authenticateAdmin(token);
            if (admin) {
                req['user'] = admin;
                next();
            } else {
                res.status(401).json({message: `Authentication Failed. Token Expired or Malformed Token`});
            }
        } else {
            res.status(401).json({message: `Invalid Authorization Header`});
        }
    } else {
        res.status(401).json({message: `You're not authenticated to access this API`});
    }
}