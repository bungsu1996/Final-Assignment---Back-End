import { model, Model, Schema } from "mongoose";
import IClocks from "../interfaces/IClocks";

const clockSchema = new Schema({
    no: { type: String, required: true },
    jam: { type: String, required: true },
});

const Clock: Model<IClocks> = model<IClocks>("clock", clockSchema);

export default Clock;
