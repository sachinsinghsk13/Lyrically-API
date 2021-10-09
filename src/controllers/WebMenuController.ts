import { Request, Response } from "express";
import navigationModelService from "../services/web-ui/NavigationMenuService";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('WebMenuController');

class WebMenuController {
    async adminWebMenus(req: Request, res: Response) {
        try {
            let menus = await navigationModelService.getMenus();
            res.json(menus);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createWebMenu(req: Request, res: Response) {
        try {
            const menu = req.body;
            let result = await navigationModelService.addMenu(menu);
            res.status(201).links({location: `${req.path}/${result._id}`}).end();
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }

    async getMenu(req: Request, res: Response) {
        try {
            const menuId = req.params.menuId;
            let result = await navigationModelService.getMenu(menuId);
            if (result)
                res.json(result);
            else
                res.status(404).end();
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateMenu(req: Request, res: Response) {
        try {
            const menuId = req.params.menuId;
            const menu = req.body;
            let result = await navigationModelService.updateMenu(menuId, menu);
            res.json({messge: 'Update Successful'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteMenu(req: Request, res: Response) {
        try {
            const menuId = req.params.menuId;
            let result = await navigationModelService.deleteMenu(menuId);
            logger.info(result);
            res.json({message: 'Delete Successfull'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

export default new WebMenuController();