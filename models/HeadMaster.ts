import { model, Model, Schema } from "mongoose";
import IHeadMaster from "../interface/headmaster.interface";

const headMasterSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  adress: { type: String, required: true },
  teachers: { type: String, required: true },
  class: { type: String, required: true },
  students: { type: Schema.Types.ObjectId, ref: "students", required: true },
  parent_students: { type: Schema.Types.ObjectId, ref: "parent_students", required: true },
  schedule: { type: Schema.Types.ObjectId, ref: "schedule", required: true },
  study_lesson: { type: Schema.Types.ObjectId, ref: "study_lesson", required: true },
  grade: { type: Schema.Types.ObjectId, ref: "grade", required: true },
  score: { type: Schema.Types.ObjectId, ref: "score", required: true },
  homeroom_teachers: { type: Schema.Types.ObjectId, ref: "homeroom_teachers", required: true },
});

const HeadMaster: Model<IHeadMaster> = model<IHeadMaster>("HeadMaster", headMasterSchema);

export default HeadMaster;
