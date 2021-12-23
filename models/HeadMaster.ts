import { model, Model, Schema } from "mongoose";
import IHeadMaster from "../interface/headmaster.interface";

const headMasterSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  adress: {type: String, required: true},
  teachers: {type: String, required: true},
  class: {type: String, required: true},
  students: {type: String, required: true},
  parent_students: {type: String, required: true},
  schedule: {type: String, required: true},
  study_lesson: {type: String, required: true},
  grade: {type: Number, required: true},
  score: {type: Number, required: true},
  homeroom_teachers: {type: String, required: true},
});

const HeadMaster: Model<IHeadMaster> = model<IHeadMaster>("HeadMaster", headMasterSchema);

export default HeadMaster; 