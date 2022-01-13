import { model, Model, Schema } from "mongoose";
import IScore from "../interfaces/IScore";

const scoreSchema = new Schema(
  {
    nameWork: { type: Schema.Types.ObjectId, ref: "schoolwork" },
    course: { type: Schema.Types.ObjectId, ref: "course" },
    dailyScore: { type: Number, required: true, default: 0 },
    midtest: { type: Number, required: true, default: 0 },
    finaltest: { type: Number, required: true, default: 0 },
    resultScore: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Score: Model<IScore> = model<IScore>("score", scoreSchema);

export default Score;
