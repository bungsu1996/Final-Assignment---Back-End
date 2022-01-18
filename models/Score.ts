import { model, Model, Schema } from "mongoose";
import IScore from "../interfaces/IScore";

const scoreSchema = new Schema(
  {
    nameWork: { type: Schema.Types.ObjectId, ref: "schoolwork" },
    course: { type: Schema.Types.ObjectId, ref: "course" },
    dailyScore: { type: Number, default: 0, min: 0, max: 100 },
    midtest: { type: Number, default: 0, min: 0, max: 100 },
    finaltest: { type: Number, default: 0, min: 0, max: 100 },
    resultScore: { type: Number, default: 0, min: 0, max: 100 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Score: Model<IScore> = model<IScore>("score", scoreSchema);

export default Score;
