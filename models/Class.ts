import { model, Model, Schema } from "mongoose";
import IClass from "../interface/class.interface";

const classSchema = new Schema({
  name: { type: String, required: true },
  homeroom_teacher:  { type: Schema.Types.ObjectId, ref: "homeroom_teacher", required: true },
  students:  { type: Schema.Types.ObjectId, ref: "students", required: true },
  grade:  { type: Schema.Types.ObjectId, ref: "grade", required: true },
});

const Class: Model<IClass> = model<IClass>("Class", classSchema);

export default Class;
