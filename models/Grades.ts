import { model, Model, Schema } from "mongoose";
import IGrade from "../interface/grade.interface";

const gradesSchema = new Schema({
  grade: { type: String, required: true },
});

const Grades: Model<IGrade> = model<IGrade>("Grades", gradesSchema);

export default Grades;
