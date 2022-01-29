import { model, Model, Schema } from "mongoose";
import IParents from "../interfaces/IParents";

const parentSchema = new Schema({
    email: { type: String, unique: true },
    emailSend: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: "1234abcd" },
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    role: { type: String, default: 'parent' },
    status: { type: String, default: 'active' },
    student: { type: Schema.Types.ObjectId, ref: "student" },
    class: { type: Schema.Types.ObjectId, ref: "class" },
});

const Parent: Model<IParents> = model<IParents>("parent", parentSchema);
export default Parent;
