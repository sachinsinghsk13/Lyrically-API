import NavigationMenuModel from "../../models/web-ui/NavigationMenu";

class NavigationModelService {
    async getMenus() {
        let menus = await NavigationMenuModel.find().sort({order: 1}).exec();
        return menus;
    }
}

const navigationModelService = new NavigationModelService();
export default navigationModelService;