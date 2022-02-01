import { model, Model, Schema } from "mongoose";
import IHomeroom from "../interfaces/IHomeroom";

const homeroomSchema = new Schema(
  {
    homeroomName: { type: Schema.Types.ObjectId, ref: "teacher" },
    className: { type: Schema.Types.ObjectId, ref: "class" },
    role: { type: String, default: 'homeroom'}
  },
  {
    versionKey: false,
  }
);

const Homeroom: Model<IHomeroom> = model<IHomeroom>("homeroom", homeroomSchema);
export default Homeroom;
