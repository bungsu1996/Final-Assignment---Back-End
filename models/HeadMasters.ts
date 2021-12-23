import { model, Model, Schema } from "mongoose";
import IHeadMasters from "../interfaces/IHeadMasters";

const headMasterSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
});

const HeadMaster: Model<IHeadMasters> = model<IHeadMasters>(
    "headmaster",
    headMasterSchema
);
export default HeadMaster;
