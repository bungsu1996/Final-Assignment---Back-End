import { model, Model, Schema } from "mongoose";
import ITeachers from "../interface/teachers.interface";

const teachersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  adress: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: "class", required: true },
});

const Teachers: Model<ITeachers> = model<ITeachers>("Teachers", teachersSchema);

export default Teachers;
