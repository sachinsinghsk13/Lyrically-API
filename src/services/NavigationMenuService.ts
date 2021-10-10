import { ObjectId } from "bson";
import NavigationMenuModel, { NavigationMenu } from "../models/NavigationMenu";

class NavigationModelService {
    async getMenus() {
        let menus = await NavigationMenuModel.find().sort({order: 1}).exec();
        return menus;
    }

    async addMenu(menu: NavigationMenu) {
        let savedMenu = await NavigationMenuModel.create(menu);
        return savedMenu;
    }

    async getMenu(menuId: string) {
        return await NavigationMenuModel.findById(menuId).exec();
    }

    async updateMenu(menuId: string, menu: NavigationMenu) {
       return await NavigationMenuModel.updateOne({_id: new ObjectId(menuId)}, menu).exec();
    }

    async deleteMenu(menuId: string) {
        return await NavigationMenuModel.deleteOne({_id: new ObjectId(menuId)}).exec();
    }
}

const navigationModelService = new NavigationModelService();
export default navigationModelService;