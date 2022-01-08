import { model, Model, Schema } from "mongoose";
import IParents from "../interfaces/IParents";

const parentSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, default: "1234abcd" },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    student: { type: Schema.Types.ObjectId, ref: "student" },
    class: { type: Schema.Types.ObjectId, ref: "class" },
});

const Parent: Model<IParents> = model<IParents>("parent", parentSchema);
export default Parent;
