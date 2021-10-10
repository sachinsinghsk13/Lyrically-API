

import { Document, model, Schema } from "mongoose";

export interface Category extends Document {
    title: String
    created: Date;
    description: String;
}

const CategorySchema = new Schema<Category>({
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