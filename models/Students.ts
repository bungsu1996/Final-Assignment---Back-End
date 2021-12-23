import { model, Model, Schema } from "mongoose";
import IStudent from "../interface/students.interface";

const studentSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  adress: {type: String, required: true},
  parent: {type: Schema.Types.ObjectId, ref: "parent", required: true},
  class: {type: Schema.Types.ObjectId, ref: "class", required: true},
  score: {type: Schema.Types.ObjectId, ref: "score", required: true},
});

const Student: Model<IStudent> = model<IStudent>("Student", studentSchema);

export default Student;

