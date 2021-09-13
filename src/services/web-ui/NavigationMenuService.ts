import NavigationMenuModel, { NavigationMenu } from "../../models/web-ui/NavigationMenu";

class NavigationModelService {
    async getMenus() {
        let menus = await NavigationMenuModel.find().sort({order: 1}).exec();
        return menus;
    }

    async addMenu(menu: NavigationMenu) {
        let savedMenu = await NavigationMenuModel.create(menu);
        return savedMenu;
    }
}

const navigationModelService = new NavigationModelService();
export default navigationModelService;