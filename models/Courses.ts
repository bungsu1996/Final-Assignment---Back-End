import { model, Model, Schema } from "mongoose";
import ICourses from "../interfaces/ICourses";

const courseSchema = new Schema(
  {
    course: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'teacher' }
  },
  {
    versionKey: false,
  }
);

const Course: Model<ICourses> = model<ICourses>("course", courseSchema);

export default Course;
