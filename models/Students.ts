import { model, Model, Schema } from "mongoose";
import IStudents from "../interfaces/IStudents";

const studentSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    classes: { type: Schema.Types.ObjectId, ref: "class" },
    score: [{ type: Schema.Types.ObjectId, ref: "score" }],
});

const Student: Model<IStudents> = model<IStudents>("student", studentSchema);
export default Student;
