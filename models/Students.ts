import { model, Model, Schema } from "mongoose";
import IStudents from "../interfaces/IStudents";

const studentSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "1234abcd" },
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    classes: { type: Schema.Types.ObjectId, ref: "class" },
    score: [{ type: Schema.Types.ObjectId, ref: "score" }],
});

const Student: Model<IStudents> = model<IStudents>("student", studentSchema);
export default Student;
