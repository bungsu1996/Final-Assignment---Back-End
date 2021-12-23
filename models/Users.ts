import { model, Model, Schema } from "mongoose";
import IUsers from "../interfaces/IUsers";

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["HeadMaster", "Teacher", "Student", "Parent"],
        required: true,
    },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
});

const User: Model<IUsers> = model<IUsers>("user", userSchema);
export default User;
