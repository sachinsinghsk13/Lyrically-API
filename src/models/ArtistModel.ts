import { Document, model, Schema } from "mongoose";
import { string } from "yup/lib/locale";

export interface Artist extends Document {
    name:String;
    realname:String;
    description: String;
}

const ArtistSchema = new Schema<Artist>({
    name: {
        type: String,
        require: true,

    },
    realname:{
        type:String,
        require:false,
    },
    description: {
        type: String,
        require: false,
    },
});

const ArtistModel = model<Artist>('artist', ArtistSchema);

export { ArtistModel };