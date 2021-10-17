import { Request, Response } from "express";
import navigationModelService from "../services/NavigationMenuService";
import API from "../utilities/api-response";
import createModuleLogger from "../utilities/logger";
const logger = createModuleLogger('WebMenuController');

class WebMenuController {
    async adminWebMenus(req: Request, res: Response) {
        try {
            let menus = await navigationModelService.getMenus();
            API.success()
            .fetched('WebMenu')
            .attachData(menus)
            .send(res);
        } catch (err) {
            logger.error(err);
            API.error(err).send(res);
        }
    }

    async createWebMenu(req: Request, res: Response) {
        try {
            const menu = req.body;
            let result = await navigationModelService.addMenu(menu);
            API.success()
            .created(`${req.path}/${result._id}`, 'Webmenu')
            .send(res);
        } catch(err) {
            API.error(err).send(res);
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