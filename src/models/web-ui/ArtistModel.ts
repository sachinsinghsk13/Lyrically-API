import { model, Schema } from "mongoose";
import { string } from "yup/lib/locale";

export interface Artist {
    name:String;
    realname:String;
    description: String;
}

const ArtistSchema = new Schema({
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