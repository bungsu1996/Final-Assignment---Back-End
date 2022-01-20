import { model, Model, Schema } from "mongoose";
import IOtp from "../interfaces/IOtp";

const otpSchema = new Schema(
  {
    email: { type: String, required: true  },
    code: { type: String },
    expireIn: { type: Number }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Otp: Model<IOtp> = model<IOtp>("otp", otpSchema, 'otp');
export default Otp;
