import { Request, Response } from "express";
import CategoryService from "../services/web-ui/CategoryService";
import { CustomError } from "../utilities/custom-error";
import createModuleLogger from "../utilities/logger";
import * as yup from 'yup';
import navigationModelService from "../services/web-ui/NavigationMenuService";
const logger = createModuleLogger('AdminController');

//..................................Add Category..................................................//

class CategoryController{

    async Createcategory(req: Request, res: Response) {
        try {
            let category= req.body;
             category = await CategoryService.Createcategory(category);
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

    async GetAllCategory(req: Request, res: Response) {
        try {
            let AllCategory = await CategoryService.GetAllCategory();
            res.json({ data: AllCategory });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


}
export default new CategoryController();

