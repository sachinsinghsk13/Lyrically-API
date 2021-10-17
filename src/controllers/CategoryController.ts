import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import API from "../utilities/api-response";
import CustomException from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('CategoryController');

//..................................Add Category..................................................//

class CategoryController {

    async createCategory(req: Request, res: Response) {
        try {
            let category = req.body;
            category = await CategoryService.createCategory(category);
            API.success()
            .created(`${req.path}/${category._id}`, 'Music Category')
            .send(res);
        } catch (error) {
            API.error(error).send(res);
        }

    } catch(err) {
        logger.info('Error', err);

    }
    // --------------------------------------get all category----------------------------------------
    async getAllCategory(req: Request, res: Response) {
        try {
            let allCategories = await CategoryService.getAllCategories();
            res.json({ data: allCategories });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // --------------------------------------get all category by id----------------------------------------
    async getCategoryById(req: Request, res: Response) {
        try {
            // let category = await CategoryService.getCategory();
        } catch (error) {
            
        }
    }

    // ------------------------------------Delete category throw id--------------------------
    async deleteCategory(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let query = { '_id': id };
            let DeleteCategory = await CategoryService.deleteCategory(query);
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
            let updateCategory = await CategoryService.updateCategory(query);
            res.json({ data: query });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
export default new CategoryController();

