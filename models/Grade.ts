import { model, Model, Schema } from "mongoose";
import IGrade from "../interfaces/IGrade";

const gradeSchema = new Schema({
  grade: { type: String, unique: true }
}, {
  versionKey: false,
})

const Grade: Model<IGrade> = model<IGrade>("grade", gradeSchema)
export default Grade;