import { model, Model, Schema } from "mongoose";
import IParents from "../interfaces/IParents";

const parentSchema = new Schema({
<<<<<<< HEAD
    email: { type: String, required: true },
    password: { type: String, required: true, default: "1234abcd" },
=======
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: '1234abcd' },
>>>>>>> 2f95f8ee60ebdb44d437d07ec50a8b9cb848667a
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    student: { type: Schema.Types.ObjectId, ref: "student" },
    class: { type: Schema.Types.ObjectId, ref: "class" },
});

const Parent: Model<IParents> = model<IParents>("parent", parentSchema);
export default Parent;
