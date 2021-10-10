import { Artist, ArtistModel } from "../models/ArtistModel";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('ArtistService');

class ArtistService {
    async createArtist(artist: Artist) {
        try {

            let doc = new ArtistModel(artist);
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

    async getAllArtists() {
        try {
            let doc = ArtistModel.find().exec()

            return doc;

        } catch (err) {
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomError('Validation Error', 400, response);
            }
            throw new Error('Error while saving Artist');
        }
    }
    async updateArtist(query) {
        try {
            let doc = ArtistModel.updateOne(query).exec
            return doc;

        } catch (err) {
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomError('Validation Error', 400, response);
            }
            throw new Error('Error while saving category');
        }
    }
}
export default new ArtistService();