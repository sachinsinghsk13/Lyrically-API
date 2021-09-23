import { Category, CategoryModel } from "../../models/CategoryModel";
import { CustomError } from "../../utilities/custom-error";
import createModuleLogger from "../../utilities/logger";


class CategoryService {
    async Createcategory(Category: Category) {
        try {
            let doc = new CategoryModel(Category);
            doc = await doc.save();
            return doc;
        } catch (err) {
            // its a validation error
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomError('Validation Error', 400, response);
            }
            throw new Error('Error while saving category');
        }
    }
    async GetAllCategory(Category:Category) {
        try {
            let doc = CategoryModel.find().exec()
                        
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
export default new CategoryService();