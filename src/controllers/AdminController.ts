import { Request, Response } from "express";

class AdminController {

    async hello(req: Request, res: Response) {
        res.json({Ok: 'Ok'});
        res.end();
    }
}

export default new AdminController();