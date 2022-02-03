import { model, Model, Schema } from "mongoose";
import ITeachers from "../interfaces/ITeachers";

const teacherSchema = new Schema({
    // nip: { type: String, default: 0 },
    email: { type: String, unique: true },
    emailSend: { type: String, unique: true, required: true  },
    password: { type: String, default: "1234abcd" },
    fullName: { type: String, required: true },
    birthDate: { type: String, required: true },
    course: [{ type: Schema.Types.ObjectId, ref: "course" }],
    schedule: [{ type: Schema.Types.ObjectId, ref: "calendar" }],
    teachClass: [{ type: Schema.Types.ObjectId, ref: "class" }],
    role: { type: String, default: "Teacher" },
    homeClass: { type: Schema.Types.ObjectId, ref: "class"}
});

const Teacher: Model<ITeachers> = model<ITeachers>("teacher", teacherSchema);
export default Teacher;
