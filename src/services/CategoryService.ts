import { Error as MongoError } from "mongoose";
import { Category, CategoryModel } from "../models/CategoryModel";
import CustomException from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
import handleMongoDBException from "../utilities/mongo-error-handler";


class CategoryService {
    async createCategory(category: Category) {
        try {
            let doc = new CategoryModel(category);
            doc = await doc.save();
            return doc;
        } catch (error) {
            if (error.name) {
                handleMongoDBException(error);
            }
            throw error;
        }
    }
    async getAllCategories() {
        try {
            let doc = CategoryModel.find().exec()

            return doc;

        } catch (err) {
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomException('Validation Error', 400, response);
            }
            throw new Error('Error while saving category');
        }
    }
    async getCategory(id: string) {
        try {
            let doc = await CategoryModel.findById(id);
            return doc;
        } catch (error) {
            
        }
    }
    async deleteCategory(query) {
        try {
            let doc = CategoryModel.deleteOne(query).exec
            return doc;

        } catch (err) {
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomException('Validation Error', 400, response);
            }
            throw new Error('Error while saving category');
        }
    }

    async updateCategory(query) {
        try {
            let doc = CategoryModel.updateOne(query).exec
            return doc;

        } catch (err) {
            if (err.errors) {
                let error = err.errors;
                let response: any = {};
                throw new CustomException('Validation Error', 400, response);
            }
            throw new Error('Error while saving category');
        }
    }

}
export default new CategoryService();