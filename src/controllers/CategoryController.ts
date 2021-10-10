import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('CategoryController');

//..................................Add Category..................................................//

class CategoryController {

    async createCategory(req: Request, res: Response) {
        try {
            let category = req.body;
            category = await CategoryService.CreateCategoryService(category);
            res.json(category);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.httpStatusCode).json(error.response).end();
            } else {
                res.status(500).json(error).end();
            }
        }

    } catch(err) {
        logger.info('Error', err);

    }
    // --------------------------------------get all category----------------------------------------
    async getAllCategory(req: Request, res: Response) {
        try {
            let AllCategory = await CategoryService.GetAllCategoryService();
            res.json({ data: AllCategory });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // ------------------------------------Delete category throw id--------------------------
    async deleteCategory(req: Request, res: Response) {
        try {
            let id = (req.params.categoryId);
            let query = { '_id': id };
            let DeleteCategory = await CategoryService.DeleteCategoryService(query);
            res.json({ data: query });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // ------------------------------update throw id--------------------------------------------------

    async updateCategory(req: Request, res: Response) {
        try {
            let id = (req.params.categoryId);
            let { titile, descriprtion } = req.body;
            let query = { '_id': id };
            let updateCategory = await CategoryService.UpdateCategoryService(query);
            res.json({ data: query });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
export default new CategoryController();

