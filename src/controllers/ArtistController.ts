import { Request, Response } from "express";
import ArtistService from "../services/web-ui/ArtistService";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";


const logger = createModuleLogger('ArtishController');

class ArtistController {

    async CreateArtist(req: Request, res: Response) {
        try {
            let Artist = req.body;
            Artist = await ArtistService.createArtist(Artist);
            res.json({ message: "sucessfull  create" });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.httpStatusCode).json(error.response).end();
            } else {
                res.status(500).json(error).end();
            }
        }
    }

    async GetAllArtist(req: Request, res: Response) {
        try {
            let AllArtist = await ArtistService.GetAllArtistService();
            res.json({ data: AllArtist });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
}




export default new ArtistController();