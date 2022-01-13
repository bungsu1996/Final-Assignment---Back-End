import { model, Model, Schema } from "mongoose";
import IClass from "../interfaces/IClass";

const classSchema = new Schema(
  {
    className: { type: String, required: true },
    yearAcademic: { type: Number, required: true },
    homeTeacher: { type: Schema.Types.ObjectId, ref: "teacher" },
    student: [{ type: Schema.Types.ObjectId, ref: "student" }],
    schedule: [{ type: Schema.Types.ObjectId, ref: "schedule" }],
  },
  {
    versionKey: false,
  }
);

const Class: Model<IClass> = model<IClass>("class", classSchema);

export default Class;
