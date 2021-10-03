

import { model, Schema } from "mongoose";
import { string } from "yup/lib/locale";

export interface Category {
    title: String
    created: Date;
    description: String;
}

const CategorySchema = new Schema({
    title: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: false,
    },
    created: {
        type: Date,
        default: new Date()
    },

});

const CategoryModel = model<Category>('Category', CategorySchema);

export { CategoryModel };