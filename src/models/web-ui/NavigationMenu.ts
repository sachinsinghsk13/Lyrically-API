import { Document, model, Schema } from "mongoose";

export interface NavigationSubmenu extends Document {
    title: string;
    path: string;
    icon: string;
    order: number;
}

export interface NavigationMenu extends Document{
    title: string;
    path: string;
    icon: string;
    order: number;
    hasSubmenu: boolean;
    submenu?: NavigationSubmenu[]
}

const NavigationSubmenuSchema = new Schema<NavigationSubmenu>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: false,
        trim: true
    },
    icon: {
        type: String
    },
    order: {
        type: Number
    }
});

const NavigationMenuSchema = new Schema<NavigationMenu>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: false,
        trim: true
    },
    icon: {
        type: String
    },
    order: {
        type: Number
    },
    hasSubmenu: {
        type: Boolean,
        default: false
    },

    submenu: {
        type: [NavigationSubmenuSchema],
        required: false
    }
});


const NavigationMenuModel = model<NavigationMenu>('WebNavigationMenu', NavigationMenuSchema);
export default NavigationMenuModel;