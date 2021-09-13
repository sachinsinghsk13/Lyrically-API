import { model, Schema } from "mongoose";
import { string } from "yup/lib/locale";

export interface Admin {
    name: string;
    username: string;
    email: string;
    password: string;
    created: Date;
    avtarImg: string;
}

const AdminSchema = new Schema<Admin>({
    name: { type: String, required: true, minLength: 3, maxLength: 15, trim: true },
    username: { type: String, required: true, minLength: 5, maxLength: 15, unique: true, trim: true},
    email: { type: String, required: true, },
    password: { type: String, required: true },
    created: { type: Date, default: new Date() },
    avtarImg: {type: string, required: false}
});

const AdminModel = model<Admin>('Admin', AdminSchema);

export { AdminModel };