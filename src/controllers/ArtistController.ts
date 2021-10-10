import { Request, Response } from "express";
import ArtistService from "../services/ArtistService";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";


const logger = createModuleLogger('ArtishController');

class ArtistController {

    async createArtist(req: Request, res: Response) {
        try {
            let artist = req.body;
            artist = await ArtistService.createArtist(artist);
            res.json({ message: "sucessfull  create" });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.httpStatusCode).json(error.response).end();
            } else {
                res.status(500).json(error).end();
            }
        }
    }

    async getAllArtists(req: Request, res: Response) {
        try {
            let allArtist = await ArtistService.getAllArtists();
            res.json({ data: allArtist });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
}




export default new ArtistController();