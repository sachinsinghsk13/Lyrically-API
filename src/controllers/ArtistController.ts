import { Request, Response } from "express";
import ArtistService from "../services/ArtistService";
import API from "../utilities/api-response";
import CustomException from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";


const logger = createModuleLogger('ArtishController');

class ArtistController {

    async createArtist(req: Request, res: Response) {
        try {
            let artist = req.body;
            artist = await ArtistService.createArtist(artist);
           API.success()
           .created(`${req.path}/${artist._id}`, 'Artist')
           .send(res);
        } catch (error) {
           API.error(error).send(res);
        }
    }

    async getAllArtists(req: Request, res: Response) {
        try {
            let artists = await ArtistService.getAllArtists();
            API.success()
            .fetched('Artist')
            .attachData(artists)
            .send(res);
        } catch (err) {
            API.error(err).send(res);
        }
    }
    
}




export default new ArtistController();