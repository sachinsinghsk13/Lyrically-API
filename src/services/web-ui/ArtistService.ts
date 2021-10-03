import { Query } from "mongoose";
import { Artist, ArtistModel } from "../../models/web-ui/ArtistModel";
import { CustomError } from "../../utilities/custom-error";
import createModuleLogger from "../../utilities/logger";

class ArtistService{
    async createArtist(Artist:Artist) {
        try {
          
            let doc = new ArtistModel(Artist);
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




    async GetAllArtistService() {
        try {
            let doc = ArtistModel.find().exec()

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
    async UpdateArtistService (query) {
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