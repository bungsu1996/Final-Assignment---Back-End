import { model, Model, Schema } from "mongoose";
import IStudents from "../interfaces/IStudents";

const studentSchema = new Schema({
  nis: { type: String, unique: true, default: 0 },
  email: { type: String, unique: true },
  emailSend: { type: String, required: true, unique: true },
  password: { type: String, default: "1234abcd" },
  fullName: { type: String },
  birthDate: { type: String },
  yearAcademic: { type: String, default: "2021/2022" },
  role: { type: String, default: "student" },
  status: { type: String, default: "active" },
  classes: { type: Schema.Types.ObjectId, ref: "class" },
  schedule: [{ type: Schema.Types.ObjectId, ref: "calendar" }],
  score: [{ type: Schema.Types.ObjectId, ref: "score" }],
  parent: [{ type: Schema.Types.ObjectId, ref: "parent" }],
  grade: { type: Schema.Types.ObjectId, ref: "grade" },
});

const Student: Model<IStudents> = model<IStudents>("student", studentSchema);
export default Student;
