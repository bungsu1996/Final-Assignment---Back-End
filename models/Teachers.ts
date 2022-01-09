import { model, Model, Schema } from "mongoose";
import ITeachers from "../interfaces/ITeachers";

const teacherSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '1234abcd'},
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    course: { type: Schema.Types.ObjectId, ref: "course" },
    teachClass: [{ type: Schema.Types.ObjectId, ref: "class" }],
});

const Teacher: Model<ITeachers> = model<ITeachers>("teacher", teacherSchema);
export default Teacher;
