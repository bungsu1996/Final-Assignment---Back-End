import { model, Model, Schema } from "mongoose";
import IParentStudent from "../interface/parent_students.interface";

const parentStudentSchema = new Schema({
  father: {type: String, required: true},
  mother: {type: String, required: true},
  address: {type: String, required: true},
  telphone: {type: Number, required: true},
  students: {type: Schema.Types.ObjectId, ref: "students", required: true},
  schedule: {type: Schema.Types.ObjectId, ref: "schedule", required: true},
  score: {type: Schema.Types.ObjectId, ref: "score", required: true},
});

const parentStudent: Model<IParentStudent> = model<IParentStudent>("ParentStudent", parentStudentSchema);

export default parentStudent;