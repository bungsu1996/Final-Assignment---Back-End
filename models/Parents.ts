import { model, Model, Schema } from "mongoose";
import IParents from "../interfaces/IParents";

const parentSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    child: { type: String, required: true },
});

const Parent: Model<IParents> = model<IParents>("parent", parentSchema);
export default Parent;
