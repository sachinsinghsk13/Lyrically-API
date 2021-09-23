

import { model, Schema } from "mongoose";
import { string } from "yup/lib/locale";

export interface Category{
    category:String
    created: Date;
    description:String;
}

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    created: {
        type: Date,
        default: new Date()
    },

});

const CategoryModel=model<Category>('Category', CategorySchema);

export { CategoryModel };