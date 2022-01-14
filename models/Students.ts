import { model, Model, Schema } from "mongoose";
import IStudents from "../interfaces/IStudents";

const studentSchema = new Schema({
    nis: { type: String, required: true, unique: true, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "1234abcd" },
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    role: { type: String, default: "student" },
    status: { type: String, default: "active" },
    classes: { type: Schema.Types.ObjectId, ref: "class" },
    score: [{ type: Schema.Types.ObjectId, ref: "score" }],
});

const Student: Model<IStudents> = model<IStudents>("student", studentSchema);
export default Student;
