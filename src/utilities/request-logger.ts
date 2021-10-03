import { Request, Response } from "express";
import createModuleLogger from "./logger";

const logger = createModuleLogger('Http Server');

const RequestLogger = () => {
    return (req: Request, res: Response, next: any) => {
        logger.info(`${req.method.toUpperCase()} ${req.path} Body: ${req.body ? JSON.stringify(req.body).substr(0, 30): 'No Body'}`);
        next();
    }
} 

export default RequestLogger;